<?php
namespace Hasinur\Phonebook\Admin;

use Hasinur\Phonebook\Core\Interfaces\HookableInterface;

/**
 * Admin menu class.
 *
 * @since 1.0.0
 */
class Menu implements HookableInterface {

    /**
     * Menu page title.
     *
     * @var string
     */
    protected $page_title;

    /**
     * Menu page title.
     *
     * @var string
     */
    protected $menu_title;

    /**
     * Menu page base capability.
     *
     * @var string
     */
    protected $base_capability;

    /**
     * Menu page base capability.
     *
     * @var string
     */
    protected $capability;

    /**
     * Menu page slug.
     *
     * @var string
     */
    protected $menu_slug;

    /**
     * Menu page icon url.
     *
     * @var string
     */
    protected $icon;

    /**
     * Menu page position.
     *
     * @var int
     */
    protected $position;

    /**
     * Submenu pages.
     *
     * @var array
     */
    protected $submenus;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {

        $this->page_title      = __( 'Phonebook', 'phonebook' );
        $this->menu_title      = __( 'Phonebook', 'phonebook' );
        $this->base_capability = 'read';
        $this->capability      = 'manage_options';
        $this->menu_slug       = 'phonebook';
        $this->icon            = 'dashicons-phone';
        $this->position        = 57;
        $this->submenus        = [];
    }

    /**
     * Registers all hooks for the class.
     *
     * @return void
     */
    public function register_hooks(): void {
        add_action( 'admin_menu', [ $this, 'register_menu' ] );
    }

    /**
     * Register admin menu.
     *
     * @since  1.0.0
     *
     * @return void
     */
    public function register_menu(): void {
        global $submenu;

        add_menu_page(
            $this->page_title,
            $this->menu_title,
            $this->base_capability,
            $this->menu_slug,
            [ $this, 'render_menu_page' ],
            $this->icon,
            $this->position,
        );

        foreach ( $this->submenus as $item ) {
            $submenu[ $this->menu_slug ][] = [ $item['title'], $item['capability'], $item['url'] ]; // phpcs:ignore
        }
    }

    /**
     * Renders the admin page.
     *
     * @since  1.0.0
     *
     * @return void
     */
    public function render_menu_page(): void {
        echo '<div id="phonebook-app"></div>';
    }
}
