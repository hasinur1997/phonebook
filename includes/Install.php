<?php
namespace Hasinur\Phonebook;

/**
 * Install class.
 */
class Install {
    /**
     * Install hook.
     *
     * @return void
     */
    public static function run(): void {
        global $wpdb;
        $table           = $wpdb->prefix . 'contacts';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email JSON NOT NULL,
            phone JSON NOT NULL,
            address JSON NOT NULL,
            company VARCHAR(255),
            job_title VARCHAR(255),
            type ENUM('personal', 'work') DEFAULT 'personal',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        dbDelta($sql);
    }
}
