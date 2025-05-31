<?php
namespace Hasinur\Phonebook;

use Hasinur\Phonebook\Admin\AdminProvider;
use Hasinur\Phonebook\Api\ApiProvider;
use Hasinur\Phonebook\Assets\AssetsProvider;
use Hasinur\Phonebook\Core\Interfaces\ProviderInterface;
use Hasinur\Phonebook\Services\Database;

/**
 * Class Bootstrap
 *
 * Handles the plugin's bootstrap process.
 *
 * @package Hasinur\Phonebook
 */
class Bootstrap {
	/**
	 * Holds plugin's provider classes.
	 *
	 * @var string[]
	 */
	protected static $providers = [
		AdminProvider::class,
		ApiProvider::class,
		AssetsProvider::class
	];

	/**
	 * Runs plugin bootstrap.
	 *
	 * @return void
	 */
	public static function run(): void {
		add_action( 'init', [ self::class, 'init' ] );
		add_action( 'plugins_loaded', [ self::class, 'db_connect' ] );
	}

	/**
	 * Bootstraps the plugin. Load all necessary providers.
	 *
	 * @return void
	 */
	public static function init(): void {
		self::register_providers();
	}

	/**
	 * Registers providers.
	 *
	 * @return void
	 */
	protected static function register_providers(): void {
		foreach ( self::$providers as $provider ) {
			if ( class_exists( $provider ) && is_subclass_of( $provider, ProviderInterface::class ) ) {
				new $provider();
			}
		}
	}

	/**
	 * Connects to the database using Eloquent ORM.
	 *
	 * @return void
	 */
	public static function db_connect(): void {
		// Ensure the Database service is loaded.
		if ( class_exists( Database::class ) ) {
			Database::boot();
		} else {
			wp_die( 'Database service class not found.' );
		}
	}
}
