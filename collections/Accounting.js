const wrapper = require("../utils/wrapper")

module.exports = class Accounting {
  constructor(config) {
    this.wrapper = wrapper(config)
  }

  /**
  * Create a general ledger account.
  * 
  * @property {string} name - This describes the name of the account.
  * @property {string} glCode - The ledger code associated with the Account. These codes are mandatory and should be unique within an organization.
  * @property {boolean} manualEntriesAllowed - Specifies if manual entries can be made against this account
  * @property {string} type - Classifies the account into one of the following types: (I). **Asset**: Represents the different types of economic resources owned or controlled by business, common examples of Asset accounts are cash, cash in bank, building, inventory, prepaid rent, goodwill, accounts receivable. (II). **Liability**: represent the different types of economic obligations by a business, such as accounts payable, bank loan, bonds payable. (III). **Income**: represent the company's gross earnings and common examples include Interest Income, Sales and Service revenue. (IV). **Expense**: represent the company's expenditures to enable itself to operate. Common examples are electricity and water, rentals, depreciation, doubtful accounts, insurance. (V). **Equity**: represent the residual equity of a business (after deducting from Assets all the liabilities) including Retained Earnings and Appropriations.
  * @property {string} usage - Determines how the account shall be used. "header" accounts specify the title of a group of accounts. They are used only for grouping together detail accounts that have a similar purpose; that is, detail accounts are assigned to specific header accounts. "detail" accounts may have transactions logged against them.
  * @property {string} parentId - This is used to assign a parent for this **GLAccount**.
  * @property {string} description - Human understandable description for the Ledger Account.
  * @returns
  */
  createGeneralLedgerAccount({ name, glCode, manualEntriesAllowed, type, usage, parentId, description } = {}) {
    const data = { name, glCode, manualEntriesAllowed, type, usage, parentId, description }
    return this.wrapper({
      path: `/ledger`,
      method: 'post',
      data,
    })
  }


  /**
  * Allows retrieval of all general ledger accounts.
  * 
  * @returns
  */
  retrieveAllGeneralLedgerAccounts() {
    return this.wrapper({
      path: `/ledger`,
      method: 'get',
    })
  }


  /**
  * Allows retrieval of a single ledger account via its `id`.
  * 
  * @property {string} glAccountId - This describes the id of the general ledger.
  * @returns
  */
  retrieveGeneralLedgerAccount({ glAccountId } = {}) {
    const params = { glAccountId }
    return this.wrapper({
      path: `/ledger/glAccountId`,
      method: 'get',
      params
    })
  }


  /**
  * Performing a ledger to ledger transaction for reconciliation
  * 
  * @property {string} officeId - Describes the `id` of the office associated with the Journal entry
  * @property {string} transactionDate - Describes the transaction date.
  * @property {array_object} credits - Details of the credits contained in the journal entry.
  * @property {array_object} debits - Details of the debits contained in the journal entry.
  * @property {string} currencyCode - Describes the currency code to be used for the transaction
  * @property {string} comments - This describes an optional comment on the transaction.
  * @returns
  */
  ledgerToLedger({ officeId, transactionDate, credits, debits, currencyCode, comments } = {}) {
    const data = { officeId, transactionDate, credits, debits, currencyCode, comments }
    return this.wrapper({
      path: `/journalentries`,
      method: 'get',
      data,
    })
  }


  /**
  * 
  * 
  * @property {string} journalEntryId - This describes the id of the journal entry.
  * @property {string} comments - Optional comments for the created reversal entry, default comment is used if this field is not supplied.
  * @returns
  */
  reverseJournalEntry({ journalEntryId, comments } = {}) {
    const params = { journalEntryId }
    const data = { comments }
    return this.wrapper({
      path: `/journalentries/${journalEntryId}/reverse`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Performing transactions from a deposit account to a ledger account
  * 
  * @property {string} officeId - This describes the `id` of the office associated with the customer.
  * @property {string} transactionDate - Describes the date of the transaction.
  * @property {string} currencyCode - Describes the currency code to be used for the transaction.
  * @property {array_object} credits - Details of the credits contained in the journal entry.
  * @property {array_object} debits - Details of the debits contained in the journal entry.
  * @property {string} operationType - Specifies whether the operation is of the "credit" or "debit" type.
  * @property {string} referenceNumber - A unique reference number for the specific transaction.
  * @property {array_object} customerAccounts - This contains the `customerAccountId` and the amount to be credited to the customer's account.
  * @property {string} comments - Optional comments on the occurring transaction.
  * @returns
  */
  customerToLedger({ officeId, transactionDate, currencyCode, credits, debits, operationType, referenceNumber, customerAccounts, comments } = {}) {
    const data = { officeId, transactionDate, currencyCode, credits, debits, operationType, referenceNumber, customerAccounts, comments }
    return this.wrapper({
      path: `/accountgl`,
      method: 'post',
      data,
    })
  }


  /**
  * Allows retrieval of all Journal Entries. The list capability of journal entries can support pagination and sorting.
  * 
  * @property {undefined} perPage - undefined
  * @property {int} page - Specifies the page to be returned.
  * @returns
  */
  retrieveAllJournalEntries({ perPage, page } = {}) {
    const query = { perPage, page }
    return this.wrapper({
      path: `/journalentries`,
      method: 'get',
      query,
    })
  }


  /**
  * Retrieve a single ledger transaction
  * 
  * @property {string} runningBalance - 
  * @property {string} transactionDetails - 
  * @property {string} journalEntryId - This describes the `id` of the journal entry.
  * @returns
  */
  retrieveJournalEntry({ runningBalance, transactionDetails, journalEntryId } = {}) {
    const query = { runningBalance, transactionDetails }
    const params = { journalEntryId }
    return this.wrapper({
      path: `/journalentries/${journalEntryId}`,
      method: 'get',
      query,
      params
    })
  }
}