<?php
namespace Hasinur\Phonebook\Requests;

/**
 * Class StoreContactRequest
 * Handles the validation of the store contact form request.
 * * @package Hasinur\Phonebook\Requests
 * @since 1.0.0
 */
class StoreContactRequest extends FormRequest {
    /**
     * StoreContactRequest constructor.
     *
     * @param array|null $data Optional data for testing or internal use.
     */
    public function rules(): array {
        return [
            'name'  => 'required|min:3|max:100',
            'email' => 'required',
            'phone' => 'required',
        ];
    }
}

