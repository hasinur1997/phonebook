<?php
namespace Hasinur\Phonebook\Core\Container\Exception;

use Exception;
use HubOrder\Core\Container\NotFoundExceptionInterface;

/**
 * Exception thrown when a dependency has no default value.
 *
 * @package Hasinur\Phonebook\Container
 */
class DependencyHasNoDefaultValueException extends Exception implements NotFoundExceptionInterface {
}
