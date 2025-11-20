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
 * @author    Ettore Stani
 * @copyright 2025 Ettore Stani
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

class FreeShippingProgressAjaxModuleFrontController extends ModuleFrontController
{
    /**
     * Process AJAX requests
     */
    public function postProcess()
    {
        // Set JSON response header
        header('Content-Type: application/json');

        // Get request data
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['action'])) {
            $this->ajaxResponse(false, 'No action specified');
            return;
        }

        // CSRF Protection: Verify token
        if (!isset($input['token']) || !$this->isValidToken($input['token'])) {
            $this->ajaxResponse(false, 'Invalid security token');
            return;
        }

        // Handle get updated data action
        if ($input['action'] === 'getUpdatedData') {
            $this->getUpdatedData();
            return;
        }

        $this->ajaxResponse(false, 'Unknown action');
    }

    /**
     * Validate CSRF token
     *
     * @param string $token The token to validate
     * @return bool True if valid, false otherwise
     */
    protected function isValidToken($token)
    {
        // Get cart ID from context
        $cartId = (int)$this->context->cart->id;

        // Generate expected token
        $expectedToken = Tools::getToken(false);

        // Compare tokens (timing-safe comparison)
        return hash_equals($expectedToken, $token);
    }

    /**
     * Get updated free shipping data
     */
    protected function getUpdatedData()
    {
        // Use the shared static method from main module class
        $data = FreeShippingProgress::getFreeShippingData();

        // If no data (threshold = 0), return error
        if (empty($data)) {
            $this->ajaxResponse(false, 'Free shipping threshold not configured');
            return;
        }

        // Add success flag
        $data['success'] = true;

        echo json_encode($data);
        exit;
    }

    /**
     * Helper method to send JSON response
     */
    protected function ajaxResponse($success, $message, $data = [])
    {
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }
}
