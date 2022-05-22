const wrapper = require("../utils/wrapper")

module.exports = class IntraTransfer {
  constructor(config) {
    this.wrapper = wrapper(config)
  }

  /**
  * Perform an intra transaction for customers within the same bank
  * 
  * @property {int} fromOfficeId - This is the `id` of the office the transfer is initiated from
  * @property {int} fromClientId - The `id` of the client making the transfer.
  * @property {int} fromAccountType - The type of account transferring from. i.e. **1**=Loan Account, **2**=Savings Account. Note that it's only available for savings account at the moment. i.e. 2
  * @property {int} fromAccountId - The `id` of the transferring account.
  * @property {int} toOfficeId - The office `id` of the account being transferred to.
  * @property {int} toClientId - The `id` of the client receiving the transfer.
  * @property {int} toAccountType - The type of account receiving the transfer. e.g, 1 or 2.
  * @property {int} toAccountId - The `id` of the receiving account
  * @property {string} transactionDate - This is the date the transfer is made.
  * @property {string} transferAmount - This describes the amount to be transferred.
  * @property {string} comment - A brief description about the transfer
  * @returns
  */
  createIntraTransfer({ fromOfficeId, fromClientId, fromAccountType, fromAccountId, toOfficeId, toClientId, toAccountType, toAccountId, transactionDate, transferAmount, comment } = {}) {
    const data = { fromOfficeId, fromClientId, fromAccountType, fromAccountId, toOfficeId, toClientId, toAccountType, toAccountId, transactionDate, transferAmount, comment }
    return this.wrapper({
      path: `/intratransfer`,
      method: 'post',
      data,
    })
  }


  /**
  * List all intra transactions
  * 
  * @property {string} page - 
  * @property {string} perPage - 
  * @returns
  */
  listAccountTransfers({ page, perPage } = {}) {
    const query = { page, perPage }
    return this.wrapper({
      path: `/accounttransfers`,
      method: 'get',
      query,
    })
  }


  /**
  * Allows the retrieval of a single account transfer by its `id`.
  * 
  * @property {string} accountTransferId - This describes the id of the account transfer.
  * @returns
  */
  retrieveIntraTransfer({ accountTransferId } = {}) {
    const params = { accountTransferId }
    return this.wrapper({
      path: `/accounttransfers/${accountTransferId}`,
      method: 'get',
      params
    })
  }
}