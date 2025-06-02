<?php
/*
 * Plugin Name:       Phonebook
 * Plugin URI:        https://github.com/hasinur1997/phonebook
 * Description:       A simple phonebook plugin to manage contacts.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Hasinur Rahman
 * Author URI:        https://github.com/hasinur1997
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       phonebook
 * Domain Path:       /languages
 */


defined('ABSPATH') || exit;

use Hasinur\Phonebook\Phonebook;

require_once __DIR__ . '/vendor/autoload.php';


if ( ! defined( 'PHONEBOOK_PLUGIN_FILE' ) ) {
	define( 'PHONEBOOK_PLUGIN_FILE', __FILE__ );
}

if ( ! defined( 'PHONEBOOK_PLUGIN_DIR' ) ) {
	define( 'PHONEBOOK_PLUGIN_DIR', __DIR__ );
}

/**
 * Phonebook
 *
 * @return  Phonebook
 */
function phonebook() {
	return Phonebook::instance();
}

// Kick off the plugin.
phonebook();
