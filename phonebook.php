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

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

add_action( 'init', 'phonebook_load_textdomain' );

function phonebook_load_textdomain() {
    load_plugin_textdomain( 'phonebook', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}

add_action( 'admin_menu', 'phonebook_add_admin_menu' );

function phonebook_add_admin_menu() {
    add_menu_page(
        'Phonebook',
        'Phonebook',
        'manage_options',
        'phonebook',
        'phonebook_page_content',
        'dashicons-phone',
        6
    );
}

function phonebook_page_content() {
    // contact list table
    echo '<div id="phonebook-app"></div>';
}


add_action( 'admin_enqueue_scripts', 'phonebook_enqueue_scripts' );

function phonebook_enqueue_scripts() {
   $assets = require_once dirname( __FILE__ ) . '/build/index.asset.php';

    wp_enqueue_script(
        'phonebook-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $assets['dependencies'],
        $assets['version'],
        true
    );

    wp_set_script_translations( 'phonebook-script', 'phonebook' );
}

