const wrapper = require("../utils/wrapper")

module.exports = class Savings {
  constructor(config) {
    this.wrapper = wrapper(config)
  }

  /**
  * This endpoint lets you create a Savings Account on Woodcore.
  * 
  * @property {string} clientId - The id of the client you are creating a savings account for.
  * @property {int} productId - The `id` of the product used for this savings account. The savings account inherits the selected currency of the product and possibly other details if not overridden in the savings account creation request.
  * @property {string} createdDate - The date the Savings account is approved.
  * @property {boolean} activate - Specifies if the savings account would be activated on creation.
  * @returns
  */
  createSavingsAccount({ clientId, productId, createdDate, activate } = {}) {
    const data = { clientId, productId, createdDate, activate }
    return this.wrapper({
      path: `/savingsaccounts`,
      method: 'post',
      data,
    })
  }


  /**
  * Results in an `approved` savings application being converted into an `active` savings account.
  * 
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @property {string} activatedOnDate - This describes the date which the savings account is activated.
  * @returns
  */
  activateSavingsAccount({ accountId, activatedOnDate } = {}) {
    const params = { accountId }
    const data = { activatedOnDate }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/activate`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Returns all deposit accounts
  * 
  * @property {int} perPage - Specifies how much data to return per page in the response.
  * @property {int} page - Specifies which page would be returned.
  * @returns
  */
  listSavingsAccount({ perPage, page } = {}) {
    const query = { perPage, page }
    return this.wrapper({
      path: `/savingsaccounts`,
      method: 'get',
      query,
    })
  }


  /**
  * Retrieve deposit account by `accountId`
  * 
  * @property {string} accountId - This describes the id of the deposit account.
  * @returns
  */
  retrieveASavingsAccount1({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}`,
      method: 'get',
      params
    })
  }


  /**
  * This endpoint allows you to initiate a deposit transaction into a deposit account
  * 
  * @property {int} accountId - This describes the id of the deposit account.
  * @property {string} transactionDate - This is the date of transaction.
  * @property {string} transactionAmount - Describes the transaction amount.
  * @returns
  */
  makeDepositSavingsAccountTransaction({ accountId, transactionDate, transactionAmount } = {}) {
    const params = { accountId }
    const data = { transactionDate, transactionAmount }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/deposit`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * This endpoint allows you to initiate a withdrawal transaction into a deposit account
  * 
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @property {string} transactionDate - This simply describes the date a transaction is performed.
  * @property {string} transactionAmount - This is the transaction amount.
  * @returns
  */
  makeWithdrawalSavingsAccountTransaction({ accountId, transactionDate, transactionAmount } = {}) {
    const params = { accountId }
    const data = { transactionDate, transactionAmount }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/withdraw`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Reverses the given transaction identified by the `accountId` and `transactionId`.
  * 
  * @property {undefined} action - undefined
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @property {int} transactionId - This describes the `id` of the transaction to be reversed.
  * @returns
  */
  undoreverseSavingsAccountTransaction({ action, accountId, transactionId } = {}) {
    const query = { action }
    const params = { accountId, transactionId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/transactions/${transactionId}`,
      method: 'post',
      query,
      params
    })
  }


  /**
  * All deposit account transactions which has occurred for particular savings account identified by its `id`.
  * 
  * @property {undefined} perPage - undefined
  * @property {undefined} page - undefined
  * @property {string} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  listAllTransactions({ perPage, page, accountId } = {}) {
    const query = { perPage, page }
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/transactions`,
      method: 'get',
      query,
      params
    })
  }


  /**
  * Get specific deposit account transactions identified by the `accountId` and `transactionId`.
  * 
  * @property {string} accountId - This describes the `id` of the deposit account.
  * @property {string} transactionId - This describes the `id` of the transaction.
  * @returns
  */
  retrieveSavingsAccountTransaction({ accountId, transactionId } = {}) {
    const params = { accountId, transactionId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/transactions/${transactionId}`,
      method: 'get',
      params
    })
  }


  /**
  * Allows you to hold some amount in a deposit account
  * 
  * @property {string} accountId - This describes the `id` of the deposit account to add a lien.
  * @property {string} transactionDate - Describes the date of the transaction.
  * @property {string} transactionAmount - amount to be held from Savings account.
  * @returns
  */
  lienAmountFromSavingsAccount1({ accountId, transactionDate, transactionAmount } = {}) {
    const params = { accountId }
    const data = { transactionDate, transactionAmount }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/lien`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Release the held amount in a deposit account
  * 
  * @property {string} accountId - This describes the `id` of the deposit account to remove a lien from.
  * @property {string} resourceId - This is the `id` of the resource/transaction for which a lien would be removed.
  * @property {string} {} - 
  * @returns
  */
  releaseLienAmountOnSavingsAccount1({ accountId, resourceId } = {}) {
    const params = { accountId, resourceId }
    const data = {}
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/lien/${resourceId}`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Returns all lien in a deposit account by the `id`
  * 
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  listAllLienOnSavingsAccount({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/lien`,
      method: 'get',
      params
    })
  }


  /**
  * This resource suspends deposit accounts from taking credit or debit.
  * 
  * @property {string} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  blockSavingsAccount({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/block`,
      method: 'post',
      params
    })
  }


  /**
  * Unblock the deposit account
  * 
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  unblockSavingsAccount({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/unblock`,
      method: 'post',
      params
    })
  }


  /**
  * This endpoint allows for the blocking of a deposit account's credit operations identified by the `accountId`. All types of credits cannot be performed on the said deposit account.
  * 
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  postNoDebitPndOnSavingsAccount({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/setpnc`,
      method: 'post',
      params
    })
  }


  /**
  * This endpoint unblocks the deposit account's credit operations. Now all types of credits can be transacted to a deposit account.
  * 
  * @property {string} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  unblockPncOnSavingsAccount1({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/removepnc`,
      method: 'post',
      params
    })
  }


  /**
  * This endpoint ensures that all types of debit operations from the deposit accounts will be blocked.
  * 
  * @property {string} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  postNoCreditPncOnSavingsAccount({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/setpnd`,
      method: 'post',
      params
    })
  }


  /**
  * This endpoint unblocks the deposit account's debit operations. Now all types of debits transactions can happen from a deposit account.
  * 
  * @property {string} accountId - This describes the id of the deposit account.
  * @returns
  */
  unblockPndOnSavingsAccount1({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/removepnd`,
      method: 'post',
      params
    })
  }


  /**
  * This endpoint is used to fetch all the associated charges with a particular deposit account.
  * 
  * @property {int} accountId - This describes the `id` of the deposit account.
  * @returns
  */
  listSavingsAccountCharges({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/charges`,
      method: 'get',
      params
    })
  }


  /**
  * Fetches a particular charge for a deposit Account via its `chargeId`.
  * 
  * @property {int} accountId - This is the `id` of the deposit account.
  * @property {int} chargeId - This describes the `id` of the charge.
  * @returns
  */
  retrieveSavingsAccountCharge({ accountId, chargeId } = {}) {
    const params = { accountId, chargeId }
    return this.wrapper({
      path: `/savingsaccounts/${accountId}/charges/${chargeId}`,
      method: 'get',
      params
    })
  }


  /**
  * This resource is used to create a new Fixed Deposit Account.
  * 
  * @property {int} clientId - The client you are creating the fixed deposit account for. Either `clientId` or `groupId` must be provided.
  * @property {int} productId - This is the `id` of the product used for this fixed deposit account. The fixed deposit account inherits the selected currency of the product and possibly other details if not overridden in the fixed deposit account creation request.
  * @property {string} createdDate - The `createdDate` must be provided when initially creating fixed deposit account application.
  * @property {string} depositAmount - The fixed deposit amount for which interest is provided on maturity.
  * @property {string} depositPeriod - Used along with `depositPeriodFrequencyId` to define term for which amount is deposited in fixed deposit. e.g. 6 Months
  * @property {string} depositPeriodFrequencyId - Used along with `depositPeriod` to define term for which amount is deposited in fixed deposit. 0=Days, 1=Weeks, 2=Months, 3=Years e.g. 6 Months
  * @property {boolean} activate - Specifies if the deposit account would be activated on creation.
  * @returns
  */
  createAFixedDepositAccountApplication({ clientId, productId, createdDate, depositAmount, depositPeriod, depositPeriodFrequencyId, activate } = {}) {
    const data = { clientId, productId, createdDate, depositAmount, depositPeriod, depositPeriodFrequencyId, activate }
    return this.wrapper({
      path: `/fixeddepositaccounts`,
      method: 'post',
      data,
    })
  }


  /**
  * Results in an approved fixed deposit application being converted into an `active` fixed deposit account.
  * 
  * @property {string} accountId - This describes the `id` of the fixed deposit account.
  * @property {string} activatedOnDate - This is the date the fixed deposit account is approved.
  * @returns
  */
  activateFixedDepositAccount({ accountId, activatedOnDate } = {}) {
    const params = { accountId }
    const data = { activatedOnDate }
    return this.wrapper({
      path: `/fixeddepositaccounts/${accountId}/activate`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Results in a matured fixed deposit account being converted into a `closed` fixed deposit account.
  * 
  * @property {int} accountId - This describes the `id` of the fixed deposit account.
  * @property {string} closedOnDate - The date of account closure. Note that closure date cannot be a time earlier than the creation date of fixed deposit account.
  * @property {string} onAccountClosureId - This is the Identifier assigned to the account closure. `100`: Withdraw matured amount and pay the client, `200`: Transfer amount to savings account, specified with the savings account Id, `300`: Re-Invest the matured amount in a newly created Fixed Deposit Account.
  * @property {int} toSavingsAccountId - This describes Identifier of the savings account to transfer funds to.
  * @property {string} transferDescription - This is a brief description of the transfer details.
  * @property {string} note - An optional note on performed transaction.
  * @returns
  */
  closeFixedDepositAccount({ accountId, closedOnDate, onAccountClosureId, toSavingsAccountId, transferDescription, note } = {}) {
    const params = { accountId }
    const data = { closedOnDate, onAccountClosureId, toSavingsAccountId, transferDescription, note }
    return this.wrapper({
      path: `/fixeddepositaccounts/${accountId}/close`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Results in an `Active` fixed deposit account being converted into a `Premature Closed` fixed deposit account with options to withdraw premature amount (premature amount is calculated using interest rate chart applicable along with penal interest if any).
  * 
  * @property {int} accountId - This describes the `id` of the fixed deposit account.
  * @property {string} closedOnDate - Describes the date of closure of pre-mature fixed deposit account.
  * @property {string} note - An optional note about the pre-mature closing of the fixed deposit account.
  * @property {string} onAccountClosureId - `100`: Withdraw matured amount and pay the client, `200`: Transfer amount to savings account, specified with the `savingsAccountId`.
  * @property {string} toSavingsAccountId - Describes the `id` of the savings account which the remaining balance in the fixed deposit would be transferred to.
  * @property {string} transferDescription - A brief description of the occurring transaction.
  * @returns
  */
  preMatureCloseFixedDepositAccount({ accountId, closedOnDate, note, onAccountClosureId, toSavingsAccountId, transferDescription } = {}) {
    const params = { accountId }
    const data = { closedOnDate, note, onAccountClosureId, toSavingsAccountId, transferDescription }
    return this.wrapper({
      path: `/fixeddepositaccounts/${accountId}/prematureClose`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Fetches all the Fixed Deposits Accounts for a tenant on WoodCore.
  * 
  * @returns
  */
  listFixedDepositAccounts() {
    return this.wrapper({
      path: `/fixeddepositaccounts`,
      method: 'get',
    })
  }


  /**
  * Fetches a specific Fixed Deposit Account using the `accountId`.
  * 
  * @property {string} accountId - This describes the id of the fixed deposit account.
  * @returns
  */
  retrieveFixedDepositAccount({ accountId } = {}) {
    const params = { accountId }
    return this.wrapper({
      path: `/fixeddepositaccounts/${accountId}`,
      method: 'get',
      params
    })
  }
}