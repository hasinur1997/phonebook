<?php
namespace Hasinur\Phonebook\Core\Abstracts;

use Hasinur\Phonebook\Core\Interfaces\ProviderInterface;
use Hasinur\Phonebook\Core\Interfaces\HookableInterface;
use Hasinur\Phonebook\Phonebook;

/**
 * Handles instantiation of services.
 *
 * @package Hasinur\Phonebook\Core\Abstracts
 */
abstract class Provider implements ProviderInterface {

    /**
     * Holds classes that should be instantiated.
     *
     * @var array
     */
    protected $services = [];

    /**
     * Service provider.
     *
     * @param array $services
     *
     * @throws \ReflectionException
     */
    public function __construct( array $services = [] ) {
        if ( ! empty( $services ) ) {
            $this->services = $services;
        }

        $this->register();
    }

    /**
     * Checks if a providers' service should be registered.
     *
     * @return bool
     */
    abstract protected function can_be_registered(): bool;

    /**
     * Registers services with the container.
     *
     * @throws \ReflectionException
     */
    public function register(): void {
        foreach ( $this->services as $service ) {
            if ( ! class_exists( $service ) || ! $this->can_be_registered() ) {
                continue;
            }

            $service = (new Phonebook)->container->get( $service );

            if ( $service instanceof HookableInterface ) {
                $service->register_hooks();
            }
        }
    }
}
