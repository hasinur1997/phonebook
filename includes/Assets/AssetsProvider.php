<?php
namespace Hasinur\Phonebook\Assets;

use Hasinur\Phonebook\Core\Abstracts\Provider;

/**
 * AssetsServiceProvider will responsible for all assets services
 *
 * @package Hasinur\Phonebook\Assets
 */

class AssetsProvider extends Provider {

    /**
     * Store services
     *
     * @var array
     */
    protected $services = [
        AdminAssets::class,
        FrontendAssets::class,
        CommonAssets::class
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
