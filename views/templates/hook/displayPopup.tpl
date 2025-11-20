{*
* Free Shipping Progress Bar Module
*}

<div class="free-shipping-popup"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-duration="{$freeShippingData.popup_duration|intval}">
    <span class="free-shipping-popup-close"
        role="button"
        tabindex="0"
        aria-label="Close notification"
        title="Close">&times;</span>
    <div class="free-shipping-progress-message{if $freeShippingData.is_free_shipping} free-shipping-progress-success{/if}"
        id="free-shipping-message-popup"
        style="color: {if $freeShippingData.is_free_shipping}{$freeShippingData.success_message_color|escape:'html':'UTF-8'}{else}{$freeShippingData.message_color|escape:'html':'UTF-8'}{/if}">
        {if $freeShippingData.is_free_shipping}
            {$freeShippingData.success_message|escape:'html':'UTF-8' nofilter}
        {else}
            {$freeShippingData.message|escape:'html':'UTF-8' nofilter}
        {/if}
    </div>
    <div class="free-shipping-progress-bar-outer"
        role="progressbar"
        aria-valuenow="{$freeShippingData.percentage|escape:'html':'UTF-8'}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-labelledby="free-shipping-message-popup"
        style="background-color: {$freeShippingData.background_color|escape:'html':'UTF-8'}">
        <div class="free-shipping-progress-bar-inner" data-percentage="{$freeShippingData.percentage|escape:'html':'UTF-8'}"
            data-background="{$freeShippingData.background_color|escape:'html':'UTF-8'}" data-progress="{$freeShippingData.progress_color|escape:'html':'UTF-8'}"
            style="width: 0; background-color: {$freeShippingData.progress_color|escape:'html':'UTF-8'}">
        </div>
    </div>
</div>