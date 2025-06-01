import apiFetch from '@wordpress/api-fetch';

const BASE = '/phonebook/v1/contacts';

/**
 * ContactApi class to handle CRUD operations for contacts.
 * This class provides methods to fetch, create, update, and delete contacts.
 */
class ContactApi {
  /**
   * Fetch all contacts with optional query params.
   *
   * @param   {Object}  args  Query parameters for the request.
   *
   * @return  {Promise}        Promise resolving to the list of contacts.   
   */
  all(args = {}) {
    const queryString = new URLSearchParams(args).toString();
    const path = queryString ? `${BASE}?${queryString}` : BASE;
    return apiFetch({ path });
  }

  /**
   * Get a single contact by ID.
   *
   * @param   {string}  id  The ID of the contact to retrieve.
   *
   * @return  {Promise}      Promise resolving to the contact data.
   */
  get(id) {
    return apiFetch({ path: `${BASE}/${id}` });
  }

  /**
   * Create a new contact.
   *
   * @param   {Object}  data  The contact data to create.
   *
   * @return  {Promise}        Promise resolving to the created contact data.
   */
  create(data) {
    return apiFetch({
      path: BASE,
      method: 'POST',
      data,
    });
  }

  /**
   * Update contact by ID.
   *
   * @param   {string}  id    The ID of the contact to update.
   * @param   {Object}  data  The updated contact data.
   *
   * @return  {Promise}        Promise resolving to the updated contact data.
   */
  update(id, data) {
    return apiFetch({
      path: `${BASE}/${id}`,
      method: 'PUT',
      data,
    });
  }

  /**
   * Delete contact by ID.
   *
   * @param   {string}  id  The ID of the contact to delete.
   *
   * @return  {Promise}      Promise resolving to the deletion status.
   */
  delete(id) {
    return apiFetch({
      path: `${BASE}/${id}`,
      method: 'DELETE',
    });
  }
}

// Export a single instance
const contactApi = new ContactApi();
export default contactApi;
