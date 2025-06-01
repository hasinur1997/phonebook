<?php
namespace Hasinur\Phonebook\Api\Controllers;

use WP_REST_Server;
use WP_REST_Request;
use WP_HTTP_Response;
use WP_Error;
use Hasinur\Phonebook\Api\Controllers\BaseController;
use Hasinur\Phonebook\Models\Contact;
use Hasinur\Phonebook\Resources\ContactResource;
use Hasinur\Phonebook\Requests\StoreContactRequest;

/**
 * ContactController
 *
 * @package Hasinur\Phonebook\Api\Controllers
 */
class ContactController extends BaseController {
    /**
     * Contact namespace
     *
     * @var string
     */
    protected $namespace = 'phonebook/v1';

    /**
     * Contact rest base
     *
     * @var string
     */
    protected $rest_base = 'contacts';

    /**
     * Register routes
     *
     * @return  void
     */
    public function register_routes(): void {

        register_rest_route( $this->namespace, '/' . $this->rest_base, [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'create_item' ],
                'permission_callback' => [
                    $this,
                    'create_item_permissions_check'
                ],
            ],
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_items' ],
                'permission_callback' => [
                    $this,
                    'get_items_permissions_check'
                ],
            ],
            [
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => [ $this, 'delete_items' ],
                'permission_callback' => [
                    $this,
                    'delete_items_permissions_check'
                ],
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_item' ],
                'permission_callback' => [
                    $this,
                    'get_item_permissions_check'
                ],
            ],
            [
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => [ $this, 'update_item' ],
                'permission_callback' => [
                    $this,
                    'update_item_permissions_check'
                ],
            ],
            [
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => [ $this, 'delete_item' ],
                'permission_callback' => [
                    $this,
                    'delete_item_permissions_check'
                ],
            ]
        ] );
    }

    /**
     * Get one item from the collection.
     *
     * @param $request
     *
     * @return WP_HTTP_Response
     */
    public function get_item( $request ) {
        $id = intval( $request['id'] );

        $contact = Contact::find( $id );

        if ( ! $contact ) {
            return new WP_Error( 'not_found', __( 'Contact not found.', 'phonebook' ), [ 'status' => 404 ] );
        }

        $contact = new ContactResource( $contact );

        return $this->response( $contact );
    }

    /**
     * Check if a given request has access to get a specific item.
     *
     * @param $request
     *
     * @return WP_Error
     */
    public function get_item_permissions_check( $request ): bool {
        return current_user_can( 'manage_options' );
    }

    /**
     * Get a collection of items.
     *
     * @param $request
     *
     * @return WP_HTTP_Response
     */
    public function get_items( $request ) {
        $per_page   = !empty($request['per_page']) ? intval($request['per_page']) : 10;
        $page       = !empty($request['page']) ? intval($request['page']) : 1;
        $search     = !empty($request['search']) ? sanitize_text_field($request['search']) : '';
        $sortBy     = !empty($request['orderby']) ? sanitize_text_field($request['orderby']) : 'id';
        $sortOrder  = !empty($request['order']) ? sanitize_text_field($request['order']) : 'asc';
        $filter     = !empty($request['filter']) ? $request['filter'] : null;

        $query = Contact::query();

        if ( ! empty( $search ) ) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('job_title', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%");
            });
        }

        // Filter
        if ( ! empty( $filter ) && is_string( $filter ) ) {
            $query->where( 'type', $filter );
        }

        // Sort
        $allowedSorts = ['id', 'name', 'created_at'];
        $sortBy       = in_array($sortBy, $allowedSorts) ? $sortBy : 'id';
        $sortOrder    = strtolower($sortOrder) === 'desc' ? 'desc' : 'asc';
        $query->orderBy($sortBy, $sortOrder);

        // Paginate
        $contacts = $query->paginate( $per_page, ['*'], 'page', $page );

        // Return
        return rest_ensure_response( $contacts );
    }

    /**
     * Check if a given request has access to get items.
     *
     * @param $request
     *
     * @return WP_Error
     */
    public function get_items_permissions_check( $request ): bool {
        return current_user_can( 'manage_options' );
    }

    /**
     * Create one item from the collection.
     *
     * @param $request
     *
     * @return WP_HTTP_Response
     * @throws Exception
     */
    public function create_item( $request ) {
        $request = new StoreContactRequest();

        if ( ! $request->validate() ) {
            return new \WP_REST_Response(['errors' => $request->errors()], 422);
        }

        $contact = Contact::create( $request->validated() );

        if ( ! $contact ) {
            return new WP_Error( 'create_failed', __( 'Failed to create contact.', 'phonebook' ), [ 'status' => 409 ] );
        }

        $contact = new ContactResource( $contact );

        return $this->response( $contact, 201 );
    }

    /**
     * Check if a given request has access to create items.
     *
     * @param $request
     *
     * @return WP_Error
     */
    public function create_item_permissions_check( $request ): bool {
        return current_user_can( 'manage_options' );
    }

    /**
     * Update one item from the collection.
     *
     * @param $request
     *
     * @return WP_HTTP_Response
     * @throws Exception
     */
    public function update_item( $request ) {
        $id = intval( $request['id'] );
        $request = new StoreContactRequest();

        if ( ! $request->validate() ) {
            return new \WP_REST_Response(['errors' => $request->errors()], 422);
        }

        $contact = Contact::find( $id );

        if ( ! $contact ) {
            return new WP_Error( 'not_found', __( 'Contact not found.', 'phonebook' ), [ 'status' => 404 ] );
        }

        $contact->update( $request->validated() );
        $contact = new ContactResource( $contact );

        return $this->response( $contact, 200 );
    }

    /**
     * Check if a given request has access to update a specific item.
     *
     * @param $request
     *
     * @return WP_Error
     */
    public function update_item_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }

    /**
     * Delete one item from the collection.
     *
     * @param $request
     *
     * @return WP_HTTP_Response
     */
    public function delete_item( $request ) {
        $id = intval( $request['id'] );

        $contact = Contact::find( $id );

        if ( ! $contact ) {
            return new WP_Error( 'not_found', __( 'Contact not found.', 'phonebook' ), [ 'status' => 404 ] );
        }

        $contact->delete();

        return $this->response( [
            'message' => __( 'Contact deleted successfully.', 'phonebook' ),
        ], 200 );
    }

    /**
     * Check if a given request has access to delete a specific item.
     *
     * @param $request
     *
     * @return WP_Error
     */
    public function delete_item_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }

    /**
     * Delete a collection of items
     *
     * @param $request
     *
     * @return WP_HTTP_Response
     */
    public function delete_items( $request ) {
        $ids = $request['ids'];

    }

    /**
     * Check if a given request has access to delete a collection of items.
     *
     * @param $request
     *
     * @return WP_Error
     */
    public function delete_items_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}
