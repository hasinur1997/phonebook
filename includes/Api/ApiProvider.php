<?php
namespace Hasinur\Phonebook\Api;

use Hasinur\Phonebook\Api\Controllers\ContactController;
use Hasinur\Phonebook\Core\Abstracts\Provider;

/**
 * Class ApiProvider.
 *
 * Provides the API functionality of the plugin.
 *
 * @package Hasinur\Phonebook\Api
 */
class ApiProvider extends Provider {
    /**
     * Register all the necessary services for the WooCommerce.
     * Dependencies are automatically resolved.
     *
     * @var array $services
     */
    protected $services = [
        ContactController::class,
    ];
    
    /**
     * Checks if a service should be registered.
     *
     * @return bool
     */
    protected function can_be_registered(): bool {
        return true;
    }
}

