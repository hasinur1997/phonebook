<?php
namespace Hasinur\Phonebook\Core\Container\Exception;

use Exception;
use Hasinur\Phonebook\Core\Container\ContainerExceptionInterface;

/**
 * Exception thrown when a dependency is not instantiable.
 *
 * @package HubOrder\Container
 */
class DependencyIsNotInstantiableException extends Exception implements ContainerExceptionInterface {
}
