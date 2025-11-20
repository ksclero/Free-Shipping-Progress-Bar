<?php
/**
 * Free Shipping Progress Bar for PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the MIT License
 * that is bundled with this package in the file LICENSE.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/MIT
 *
 * @author    Ettore Stani <info@ettorestani.it>
 * @copyright 2025 Ettore Stani
 * @license   https://opensource.org/licenses/MIT  MIT License
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * Upgrade to version 2.0.0
 *
 * Major improvements:
 * - Security: Added CSRF protection to AJAX endpoint
 * - Performance: Implemented client-side caching and debouncing
 * - Security: Added XSS prevention with output escaping in templates
 * - Feature: Multi-currency support with automatic conversion
 * - Validation: Added input validation for all configuration fields
 * - UX: Better error handling with user feedback
 * - Code quality: Eliminated code duplication, improved maintainability
 */
function upgrade_module_2_0_0($module)
{
    // No database changes needed - all improvements are in code
    // Configuration keys remain the same for backward compatibility

    return true;
}
