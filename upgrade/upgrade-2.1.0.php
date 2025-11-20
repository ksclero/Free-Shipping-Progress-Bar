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
 * Upgrade to version 2.1.0
 *
 * New Features:
 * - Product/Category exclusion: Exclude specific products, categories, or virtual products from threshold calculation
 * - Enhanced accessibility: Full ARIA attributes support for screen readers
 * - Complete Italian translations
 *
 * @param object $module The module instance
 * @return bool True if upgrade successful
 */
function upgrade_module_2_1_0($module)
{
    // Add new configuration keys for exclusion settings
    Configuration::updateValue('FREESHIPPING_EXCLUDE_VIRTUAL', false);
    Configuration::updateValue('FREESHIPPING_EXCLUDE_CATEGORIES', '');
    Configuration::updateValue('FREESHIPPING_EXCLUDE_PRODUCTS', '');

    return true;
}
