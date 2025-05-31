<?php
namespace Hasinur\Phonebook\Assets;

/**
 * Manage all admin scripts and styles
 */
class AdminAssets extends BaseAssets {
    /**
     * Enqueue all scripts and styles
     *
     * @return  void
     */
    public function register_hooks(): void {
        add_action( 'admin_enqueue_scripts', [$this, 'register_scripts'] );
        add_action( 'admin_enqueue_scripts', [$this, 'register_styles'] );
        add_action( 'admin_enqueue_scripts',  [$this, 'enqueue_scripts_styles'] );
    }

    /**
     * Enqueue scripts and styles
     *
     * @return  void
     */
    public function enqueue_scripts_styles() {
        wp_enqueue_script( 'phonebook-admin-scripts' );
    }

    /**
     * Get all scripts
     *
     * @return  array List register scripts
     */
    public function get_scripts(): array {
        $scripts = [
            'phonebook-admin-scripts'     => [
                'src'       => phonebook()->build_url . '/index.js',
                'in_footer' => true,
            ],
        ];

        return apply_filters( 'phonebook_admin_assets', $scripts );
    }

    /**
     * List of register styles
     *
     * @return  array
     */
    public function get_styles(): array {
        $styles = [
            'phonebook-admin-style'    => [
                'src' => phonebook()->build_url . '/admin.css',
            ],
        ];

        return apply_filters( 'phonebook_admin_styles', $styles );
    }
}
