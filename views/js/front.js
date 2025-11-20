/**
 * Free Shipping Progress Bar Module
 */

// Global state for debouncing
var freeShippingState = {
    updateInProgress: false
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the module
    initFreeShippingProgress();

    // Add event listeners for cart updates (PS 1.7+)
    listenForCartUpdates();
});

/**
 * Initialize the progress bar
 */
function initFreeShippingProgress() {
    const progressBars = document.querySelectorAll('.free-shipping-progress-bar-inner');
    
    if (!progressBars.length) return;
    
    progressBars.forEach(bar => {
        // Get percentage from data attribute
        const percentage = parseFloat(bar.getAttribute('data-percentage'));
        
        // Set colors from data attributes
        const backgroundColor = bar.getAttribute('data-background');
        const progressColor = bar.getAttribute('data-progress');
        
        if (backgroundColor) {
            bar.parentNode.style.backgroundColor = backgroundColor;
        }
        
        if (progressColor) {
            bar.style.backgroundColor = progressColor;
        }
        
        // Animate the progress bar
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 100);
    });
}

/**
 * Initialize the popup
 */
function initFreeShippingPopup() {
    const popup = document.querySelector('.free-shipping-popup');
    if (!popup) return;
    
    // Get settings
    const duration = parseInt(popup.getAttribute('data-duration')) || 5000;
    
    // Verifica che non siamo nella pagina del carrello
    const isCartPage = window.location.href.indexOf('controller=cart') > -1;
    if (isCartPage) return;
    
    // Mostra subito il popup (senza delay)
    popup.classList.add('active');
    
    // Nascondi popup dopo la durata configurata
    if (duration > 0) {
        setTimeout(() => {
            popup.classList.remove('active');
        }, duration);
    }
    
    // Funzionalità pulsante di chiusura
    const closeBtn = popup.querySelector('.free-shipping-popup-close');
    if (closeBtn) {
        // Click event
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });

        // Keyboard accessibility (Enter and Space keys)
        closeBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                popup.classList.remove('active');
            }
        });
    }
}

/**
 * Listen for cart updates to refresh the progress bar
 */
function listenForCartUpdates() {
    // For PrestaShop 1.7+
    prestashop.on('updatedCart', function() {
        updateFreeShippingData();
        // Attiva il popup quando viene aggiornato il carrello (se abilitato)
        if (typeof displayPopup !== 'undefined' && displayPopup) {
            setTimeout(function() {
                initFreeShippingPopup();
            }, 300); // Piccolo ritardo per dare tempo all'aggiornamento della UI
        }
    });

    // For product add event
    prestashop.on('updateCart', function() {
        updateFreeShippingData();
        // Attiva il popup quando viene aggiunto un prodotto (se abilitato)
        if (typeof displayPopup !== 'undefined' && displayPopup) {
            setTimeout(function() {
                initFreeShippingPopup();
            }, 300);
        }
    });

    // For other cart update events
    document.addEventListener('prestashop:updateCart', function() {
        updateFreeShippingData();
        // Attiva il popup quando viene aggiornato il carrello (se abilitato)
        if (typeof displayPopup !== 'undefined' && displayPopup) {
            setTimeout(function() {
                initFreeShippingPopup();
            }, 300);
        }
    });

    // Listen for quantity changes
    document.body.addEventListener('change', function(event) {
        if (event.target && event.target.matches('.js-cart-line-product-quantity')) {
            setTimeout(function() {
                updateFreeShippingData();
                // Non attiviamo il popup per cambiamenti di quantità
            }, 500);
        }
    });

    // Listen for product removal
    document.body.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.remove-from-cart')) {
            setTimeout(function() {
                updateFreeShippingData();
            }, 500);
        }
    });
    
    // Listen for "add to cart" button clicks in product pages
    document.body.addEventListener('click', function(event) {
        if (event.target && (
            event.target.matches('.add-to-cart') ||
            event.target.closest('.add-to-cart') ||
            event.target.matches('.ajax_add_to_cart_button') ||
            event.target.closest('.ajax_add_to_cart_button')
        )) {
            // Il popup sarà attivato dall'evento updateCart di prestashop
            // Button click detected, waiting for cart update event
        }
    });
}

/**
 * Update free shipping data via AJAX with debouncing
 * Cache disabled for real-time accuracy
 */
function updateFreeShippingData() {
    // Check if AJAX URL and token are defined
    if (typeof freeShippingProgressAjaxUrl === 'undefined' || typeof freeShippingProgressToken === 'undefined') return;

    // DEBOUNCING: If update is already in progress, skip
    if (freeShippingState.updateInProgress) {
        return;
    }

    // Set flag to prevent concurrent requests
    freeShippingState.updateInProgress = true;

    // Make AJAX request to get updated data
    fetch(freeShippingProgressAjaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'getUpdatedData',
            token: freeShippingProgressToken
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (!data.success) {
            throw new Error(data.message || 'Unknown error');
        }

        // Apply the data to UI
        applyFreeShippingData(data);
    })
    .catch(error => {
        console.error('Error updating free shipping data:', error);
        showErrorNotification('Unable to update free shipping progress. Please refresh the page.');
    })
    .finally(() => {
        freeShippingState.updateInProgress = false;
    });
}

/**
 * Apply free shipping data to all UI elements
 * Extracted to avoid code duplication
 *
 * @param {Object} data The free shipping data
 */
function applyFreeShippingData(data) {
    // Update all instances of the progress bar
    const containers = document.querySelectorAll('.free-shipping-progress-container');

    containers.forEach(container => {
        const msgElement = container.querySelector('.free-shipping-progress-message');
        const progressBarElement = container.querySelector('.free-shipping-progress-bar-inner');

        if (msgElement) {
            if (data.is_free_shipping) {
                msgElement.textContent = data.success_message;
                msgElement.classList.add('free-shipping-progress-success');
                msgElement.style.color = data.success_message_color;
            } else {
                msgElement.textContent = data.message;
                msgElement.classList.remove('free-shipping-progress-success');
                msgElement.style.color = data.message_color;
            }
        }

        if (progressBarElement) {
            progressBarElement.style.width = data.percentage + '%';
        }
    });

    // Update popup if it exists
    const popup = document.querySelector('.free-shipping-popup');
    if (popup) {
        const popupMsg = popup.querySelector('.free-shipping-progress-message');
        const popupBar = popup.querySelector('.free-shipping-progress-bar-inner');

        if (popupMsg) {
            if (data.is_free_shipping) {
                popupMsg.textContent = data.success_message;
                popupMsg.classList.add('free-shipping-progress-success');
                popupMsg.style.color = data.success_message_color;
            } else {
                popupMsg.textContent = data.message;
                popupMsg.classList.remove('free-shipping-progress-success');
                popupMsg.style.color = data.message_color;
            }
        }

        if (popupBar) {
            popupBar.style.width = data.percentage + '%';
        }

        // Show popup again
        popup.classList.add('active');

        // Hide popup after duration
        const duration = parseInt(popup.getAttribute('data-duration')) || 5000;
        if (duration > 0) {
            setTimeout(() => {
                popup.classList.remove('active');
            }, duration);
        }
    }
}

/**
 * Show error notification to user
 *
 * @param {string} message The error message to display
 */
function showErrorNotification(message) {
    // Try to use PrestaShop's notification system if available
    if (typeof prestashop !== 'undefined' && prestashop.emit) {
        prestashop.emit('showErrorNotification', { message: message });
    } else {
        // Fallback: show a simple alert (could be improved with a custom notification)
        console.error(message);
    }
}