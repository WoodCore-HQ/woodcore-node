const wrapper = require("../utils/wrapper")

module.exports = class Clients {
  constructor(config) {
    this.wrapper = wrapper(config)
  }

  /**
  * Create an Individual or corporate customer account on WoodCore.
  * 
  * @property {int} officeId - This is the `officeId` that would be associated with the customer.
  * @property {string} firstname - This describes the firstname of the customer.
  * @property {string} lastname - This is the lastname of the customer.
  * @property {string} middlename - This is the middlename of the customer.
  * @property {int} externalId - This is the `externalId` of client as stated earlier.
  * @property {boolean} _isActive - Select the active state of the client.
  * @property {string} clientType - Select the type of client. Available options are: [individual, corporate].
  * @property {string} createdDate - Describes the date the customer's details are submitted.
  * @property {string} mobileNo - This describes the client's mobile phone number.
  * @property {string} emailAddress - This describes the email address of the customer.
  * @property {boolean} _isAddressEnabled - If address is enabled, then, the address of the client is passed in the body of the request.
  * @property {int} tierLevel - This is the tier level you want configured for a customer upon creation. 3 ranks exist now which are 1, 2, and 3. Tier ranks by default are created as "1" which could have a limit on what the customer could do till some KYC requirements are met.
  * @property {string} country - This describes the country the customer resides in.
  * @property {string} street - This describes the street address of the customer
  * @property {string} city - This is the city address of the customer.
  * @property {boolean} createDepositAccount - Specifies if a deposit account should be created with the customer when creating the customer account.
  * @property {int} productId - This describes the identifier of the product type to be associated with the customer
  * @returns
  */
  createIndividualClient({ officeId, firstname, lastname, middlename, externalId, _isActive, clientType, createdDate, mobileNo, emailAddress, _isAddressEnabled, tierLevel, country, street, city, createDepositAccount, productId } = {}) {
    const data = { officeId, firstname, lastname, middlename, externalId, _isActive, clientType, createdDate, mobileNo, emailAddress, _isAddressEnabled, tierLevel, country, street, city, createDepositAccount, productId }
    return this.wrapper({
      path: `/clients`,
      method: 'post',
      data,
    })
  }


  /**
  * Clients can be created in a pending state. This API can be used when `_isActive` is `false` in the request body of customer creation.
  * 
  * @property {string} clientId - This is the `id` of the customer to be activated.
  * @property {string} activationDate - This describes the date the client is activated. Please note that the `activationDate` cannot be a date earlier than the date the client was created.
  * @returns
  */
  activateClient({ clientId, activationDate } = {}) {
    const params = { clientId }
    const data = { activationDate }
    return this.wrapper({
      path: `/clients/${clientId}/activate`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Upgrade or reduce a customer tier level
  * 
  * @property {string} clientId - This describes the `id` of the customer.
  * @property {string} tierRank - This is the `tierRank` that's been updated to, e.g., 2. `tierRank` can also be referred to as `tierLevel`.
  * @returns
  */
  changeClientTier({ clientId, tierRank } = {}) {
    const params = { clientId }
    const data = { tierRank }
    return this.wrapper({
      path: `/clients/${clientId}/updateTier`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Returns an array of objects containing all of the customers on your account. Both Individual and Corporate customers.
  * 
  * @property {int} perPage - This sets how much data to return per page, e.g 10 customers per page
  * @property {int} page - This would return the current page described in the query parameter.
  * @returns
  */
  retrieveCustomers({ perPage, page } = {}) {
    const query = { perPage, page }
    return this.wrapper({
      path: `/clients`,
      method: 'get',
      query,
    })
  }


  /**
  * This endpoint allows for the retrieval of a specific customer via it's Identifier `clientId`.
  * 
  * @property {int} clientId - This is the `id` of the client to be retrieved.
  * @returns
  */
  retrieveClient({ clientId } = {}) {
    const params = { clientId }
    return this.wrapper({
      path: `/clients/${clientId}`,
      method: 'get',
      params
    })
  }


  /**
  * 
  * 
  * @property {string} clientId - This describes the id of the client.
  * @returns
  */
  listCustomersAccounts({ clientId } = {}) {
    const params = { clientId }
    return this.wrapper({
      path: `/clients/${clientId}/accounts`,
      method: 'get',
      params
    })
  }
}