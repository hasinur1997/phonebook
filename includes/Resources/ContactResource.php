<?php
namespace Hasinur\Phonebook\Resources;

/**
 * Class ContactResource
 * Represents a contact resource for API responses.
 */
class ContactResource extends Resource {
    /**
     * Transform the contact data into an array.
     *
     * @return array
     */
    public function to_array(): array {
        return [
            'id'        => $this->data->id,
            'name'      => $this->data->name,
            'email'     => $this->data->email,
            'phone'     => $this->data->phone,
            'address'   => $this->data->address,
            'company'  => $this->data->company,
            'job_title' => $this->data->job_title,
            'type'      => $this->data->type,
        ];
    }
}
