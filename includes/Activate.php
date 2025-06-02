<?php
namespace Hasinur\Phonebook;

/**
 * Activation class.
 *
 * @package Hasinur\Phonebook
 */
class Activate {

    /**
     * Activation hook.
     *
     * @return void
     */
    public static function handle(): void {
        Install::run();
    }
}
