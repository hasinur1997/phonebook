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

// require_once __DIR__ . '/vendor/autoload.php';

//  use Illuminate\Database\Capsule\Manager as Capsule;
//  use Hasinur\Phonebook\Models\Contact;
//  // Set the event dispatcher used by Eloquent models... (optional)
// use Illuminate\Events\Dispatcher;
// use Illuminate\Container\Container;

// if ( ! defined( 'ABSPATH' ) ) {
//     exit; // Exit if accessed directly.
// }

// add_action( 'init', 'phonebook_load_textdomain' );

// function phonebook_load_textdomain() {
//     load_plugin_textdomain( 'phonebook', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
// }

// add_action( 'admin_menu', 'phonebook_add_admin_menu' );

// function phonebook_add_admin_menu() {
//     add_menu_page(
//         'Phonebook',
//         'Phonebook',
//         'manage_options',
//         'phonebook',
//         'phonebook_page_content',
//         'dashicons-phone',
//         6
//     );
// }

// function phonebook_page_content() {
//     // contact list table
//     echo '<div id="phonebook-app"></div>';
// }


// add_action( 'admin_enqueue_scripts', 'phonebook_enqueue_scripts' );

// function phonebook_enqueue_scripts() {
//    $assets = require_once dirname( __FILE__ ) . '/build/index.asset.php';

//     wp_enqueue_script(
//         'phonebook-script',
//         plugins_url( 'build/index.js', __FILE__ ),
//         $assets['dependencies'],
//         $assets['version'],
//         true
//     );

//     wp_set_script_translations( 'phonebook-script', 'phonebook' );
// }

// function phonebook_setup_database() {
// 	global $wpdb;

// 	$capsule = new Capsule;

// 	$capsule->addConnection([
// 		'driver'    => 'mysql',
// 		'host'      => DB_HOST,
// 		'database'  => DB_NAME,
// 		'username'  => DB_USER,
// 		'password'  => DB_PASSWORD,
// 		'charset'   => 'utf8',
// 		'collation' => 'utf8_unicode_ci',
// 		'prefix'    => $wpdb->prefix,
// 	]);

// 	$capsule->setAsGlobal();
// 	$capsule->bootEloquent();
// }
// add_action('plugins_loaded', 'phonebook_setup_database');


// register_activation_hook(__FILE__, 'myplugin_create_contacts_table');

// function myplugin_create_contacts_table() {
//     global $wpdb;
//     $table = $wpdb->prefix . 'contacts';
//     $charset_collate = $wpdb->get_charset_collate();

//     $sql = "CREATE TABLE $table (
//         id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email JSON NOT NULL,
//         phone JSON NOT NULL,
//         address JSON NOT NULL,
//         company VARCHAR(255),
//         job_title VARCHAR(255),
//         type ENUM('personal', 'work') DEFAULT 'personal',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     ) $charset_collate;";

//     require_once ABSPATH . 'wp-admin/includes/upgrade.php';
//     dbDelta($sql);
// }


// add_action('init', function() {
//     $results = Contact::all();
//     // var_dump($results);

//     error_log(print_r($results, true));
// });
