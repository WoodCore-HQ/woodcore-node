const wrapper = require("../utils/wrapper")

module.exports = class Loans {
  constructor(config) {
    this.wrapper = wrapper(config)
  }
  /**
  * Allows you to calculate all the parameters related to a loan and get the actual value of Interest, repayment period, fees, charges, and other details accumulated on the loan account over a period of time.
  * 
  * @property {string} clientId - This describes the Identifier of the client.
  * @property {string} productId - This describes the Identifier of the product.
  * @property {int} principal - This is the principal amount of loan for collection.
  * @property {int} duration - This describes the timeframe for which the loan would be serviced.
  * @property {string} durationBy - Describes the type of metrics the duration should be measured by. The available options include: [Month and Year]
  * @property {int} numberOfRepayments - Describes the number of repayments that will be made for a specific loan.
  * @property {int} repaymentEvery - This describes the number of times repayment would happen in specified repayment cycle.
  * @property {string} repaymentFrequency - This describes the frequency of repayment. Available options are: [Monthly, Yearly].
  * @property {int} interestRate - This is the interest rate to be calculated on the principal amount of the loan.
  * @property {string} interestType - This describes the type of Interest.
  * @property {string} expectedDisbursementDate - This describes the date the loan is expected to be disbursed.
  * @property {string} createdDate - This describes the date the loan is expected to be disbursed.
  * @property {int} linkDepositAccountId - This describes the Identifier of the savings account to be associated with the loan account.
  * @returns
  */
  calculateLoan({ clientId, productId, principal, duration, durationBy, numberOfRepayments, repaymentEvery, repaymentFrequency, interestRate, interestType, expectedDisbursementDate, createdDate, linkDepositAccountId } = {}) {
    const data = { clientId, productId, principal, duration, durationBy, numberOfRepayments, repaymentEvery, repaymentFrequency, interestRate, interestType, expectedDisbursementDate, createdDate, linkDepositAccountId }
    return this.wrapper({
      path: `/loans/calculate`,
      method: 'post',
      data,
    })
  }


  /**
  * A loan account application can be created by using this endpoint.
  * 
  * @property {int} clientId - This describes the `id` of the client submitting a loan application.
  * @property {int} productId - The `Id` of the loan product associated with the loan application. The loan application inherits some of the information from its associated Loan product.
  * @property {string} principal - The loan amount to be disbursed to through loan.
  * @property {string} loanType - To represent different type of loans. At present there are three type of loans are supported. Available loan types: ***individual***: Loan given to individual member. ***group***: Loan given to group as a whole. ***jlg***: Joint liability group loan given to members in a group on individual basis. JLG loan can be given to one or more members in a group.
  * @property {int} numberOfRepayments - This is the number of installments to repay. e.g 10 (repayments) every 12 weeks
  * @property {int} repaymentEvery - This is used like `numberOfRepayments` e.g 10 (repayments) every 12 weeks
  * @property {string} repaymentFrequency - This describes the frequency of payments for the loan. Available options include: [Monthly, Yearly]
  * @property {int} interestRate - This describes the rate of interest calculated on the principal amount of the loan.
  * @property {string} interestType - Describes the type of interest calculated on the loan. Examples include: fiat, declining, e.t.c.
  * @property {int} interestCalculationPeriodType - Example Values: 0=Daily, 1=Same as repayment period
  * @property {int} transactionProcessingStrategyId - An enumeration that indicates the type of transaction processing strategy to be used. This relates to functionality that is also known as Payment Application Logic.
  * @property {string} expectedDisbursementDate - The proposed disbursement date of the loan so a proposed repayment schedule can be provided.
  * @property {string} createdDate - The date the loan application was submitted by applicant.
  * @property {string} linkDepositAccountId - Describes the Identifier of the savings account to be linked to the loan account.
  * @returns
  */
  createALoanAccount({ clientId, productId, principal, loanType, numberOfRepayments, repaymentEvery, repaymentFrequency, interestRate, interestType, interestCalculationPeriodType, transactionProcessingStrategyId, expectedDisbursementDate, createdDate, linkDepositAccountId } = {}) {
    const data = { clientId, productId, principal, loanType, numberOfRepayments, repaymentEvery, repaymentFrequency, interestRate, interestType, interestCalculationPeriodType, transactionProcessingStrategyId, expectedDisbursementDate, createdDate, linkDepositAccountId }
    return this.wrapper({
      path: `/loans`,
      method: 'post',
      data,
    })
  }


  /**
  * This endpoint is used to approve a pending loan application.
  * 
  * @property {string} loanAccountId - This is the `id` of the loan account to be approved.
  * @property {string} approvedOnDate - This is the date the loan application is approved.
  * @property {string} expectedDisbursementDate - This describes the date that the loan is expected to be disbursed.
  * @property {string} comment - A comment on the transaction.
  * @returns
  */
  approveLoanAccount({ loanAccountId, approvedOnDate, expectedDisbursementDate, comment } = {}) {
    const params = { loanAccountId }
    const data = { approvedOnDate, expectedDisbursementDate, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/approve`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * This endpoint is used to reverse an approved loan account/application which is identified via its `loanAccountId`. i.e., Undo an approved loan account.
  * 
  * @property {undefined} command - undefined
  * @property {string} loanAccountId - This describes the Identifier of the loan account to be unapproved.
  * @property {string} comment - This is an optional note/comment on the transaction taking place.
  * @returns
  */
  undoApprovalForLoanAccount({ command, loanAccountId, comment } = {}) {
    const query = { command }
    const params = { loanAccountId }
    const data = { comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}`,
      method: 'post',
      data,
      query,
      params
    })
  }


  /**
  * This endpoint is used for disbursing a particular loan.
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan account to be disbursed.
  * @property {string} disbursementDate - This best describes the date which the loan is disbursed.
  * @property {int} transactionAmount - This is the amount that's being disbursed.
  * @property {string} bankName - This is the name of the bank to which a loan is being disbursed.
  * @property {string} referenceNumber - This is the reference.
  * @property {string} comment - An optional note/description on the action taken.
  * @returns
  */
  disburseLoan({ loanAccountId, disbursementDate, transactionAmount, bankName, referenceNumber, comment } = {}) {
    const params = { loanAccountId }
    const data = { disbursementDate, transactionAmount, bankName, referenceNumber, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/disburse`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * This is very similar to disbursing of a loan but in this case, loan disbursement is to a deposit account. The savings account here is the deposit account attached to the loan account on creation of the loan account.
  * 
  * @property {string} loanAccountId - This describes the `id` o f the loan account.
  * @property {string} disbursementDate - This best describes the day which the loan is disbursed.
  * @property {string} bankName - Describes the name of the bank to which the loan would be disbursed to.
  * @property {string} referenceNumber - Described as "en".
  * @property {int} transactionAmount - This is the amount that's to be disbursed
  * @property {string} comment - This is a comment on the transaction.
  * @returns
  */
  disburseLoanToSavings({ loanAccountId, disbursementDate, bankName, referenceNumber, transactionAmount, comment } = {}) {
    const params = { loanAccountId }
    const data = { disbursementDate, bankName, referenceNumber, transactionAmount, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/disbursetosavings`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Undo a loan disbursal using this endpoint. Get the specific loan account by its `id`.
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan account.
  * @property {string} comment - Allows for a comment on reversal of loan disbursement.
  * @returns
  */
  undoDisburseLoan({ loanAccountId, comment } = {}) {
    const params = { loanAccountId }
    const data = { comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/undodisburse`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * This allows the retrieval of all loan account in a paginated or non-paginated format.
  * 
  * @property {string} status - This describes the status of the loan account. You can set this parameter to either `active` or `inactive` status.
  * @property {int} perPage - Pagination, index to start searching at when retrieving elements, used in combination with limit to paginate results.
  * @property {int} page - Pagination, the number of elements to retrieve, used in combination with offset to paginate results
  * @property {string} sortBy - The criteria based on which the records will be sorted. Expected format is , e.g., sortBy = field1:ASC,field2:DESC.
  * @property {string} orderBy - one of `displayName`, `accountNo`, `officeId`, `officeNameOrders`. Filters the results by the field indicated.
  * @property {int} officeId - Provides ability to restrict list of loans returned based on the office there associated with.
  * @property {string} accountNo - Use account no. of loans to restrict results.
  * @returns
  */
  retrieveAllLoanAccount({ status, perPage, page, sortBy, orderBy, officeId, accountNo } = {}) {
    const query = { status, perPage, page, sortBy, orderBy, officeId, accountNo }
    return this.wrapper({
      path: `/loans`,
      method: 'get',
      query,
    })
  }


  /**
  * This endpoint allows for the retrieval of a single loan account by its `id`.
  * 
  * @property {string} loanAccountId - This is the `id` of the loan account.
  * @returns
  */
  retrieveLoanAccount({ loanAccountId } = {}) {
    const params = { loanAccountId }
    return this.wrapper({
      path: `/loans/${loanAccountId}`,
      method: 'get',
      params
    })
  }


  /**
  * Create a loan repayment by using this endpoint. The specific loan is gotten by its `loanAccountId`.
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan.
  * @property {string} transactionAmount - This description the amount of money to be repaid.
  * @property {string} transactionDate - Date of transaction. This is also used alongside the `dateFormat` and `locale` default parameters of "dd MMMM yyyy" and "en" respectively
  * @property {string} paymentTypeId - This is the paymentTypeId associated with the repayment. Payment type can include Cash payment, transfer, and so on. The paymentTypeId is associated with the `accountNumber`, `checkNumber`, `routingCode`, `receiptNumber`, and `bankNumber` depending on each case. Note that these are OPTIONAL.
  * @property {string} comment - A comment describing the transaction.
  * @returns
  */
  makeRepaymentForLoan({ loanAccountId, transactionAmount, transactionDate, paymentTypeId, comment } = {}) {
    const params = { loanAccountId }
    const data = { transactionAmount, transactionDate, paymentTypeId, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/repayment`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * A loan can be closed if an unexpected event such as the death of the customer who took the loan or when legal actions are being taken against someone owing for a long time.
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan account.
  * @property {string} transactionDate - The date the loan repayment is paid. Used alongside the `dateFormat` and `locale` parameters.
  * @property {string} locale - 
  * @property {string} dateFormat - 
  * @property {string} comment - A description of the reason behind foreclosure of loan account.
  * @returns
  */
  foreclosureOfAnActiveLoan({ loanAccountId, transactionDate, locale, dateFormat, comment } = {}) {
    const params = { loanAccountId }
    const data = { transactionDate, locale, dateFormat, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/foreclosure`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * This endpoint is used to waive interest of a specific loan account identified by its `id`.
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan account.
  * @property {string} transactionDate - The date the loan repayment is paid. Used alongside the dateFormat and locale parameters.
  * @property {string} transactionAmount - The date the loan repayment is paid. Used alongside the `dateFormat` and `locale` parameters.
  * @property {string} locale - 
  * @property {string} dateFormat - 
  * @property {string} comment - An optional comment related to the waiving of interest.
  * @returns
  */
  waiveInterestOnLoanAccount({ loanAccountId, transactionDate, transactionAmount, locale, dateFormat, comment } = {}) {
    const params = { loanAccountId }
    const data = { transactionDate, transactionAmount, locale, dateFormat, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/waiveInterest`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Write-off a particular loan with this endpoint.
  * 
  * @property {string} loanAccountId - This is the `id` of the loan account.
  * @property {string} transactionDate - The date the loan repayment is paid.
  * @property {string} comment - An optional comment related to the writing-off of the loan
  * @returns
  */
  writeOffLoan({ loanAccountId, transactionDate, comment } = {}) {
    const params = { loanAccountId }
    const data = { transactionDate, comment }
    return this.wrapper({
      path: `/loans/${loanAccountId}/writeoff`,
      method: 'post',
      data,
      params
    })
  }


  /**
  * Undo a loan write-off for a specific loan by querying its `loanId`.
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan account.
  * @returns
  */
  undoWriteOffForLoan({ loanAccountId } = {}) {
    const params = { loanAccountId }
    return this.wrapper({
      path: `/loans/${loanAccountId}/undowriteoff`,
      method: 'post',
      params
    })
  }


  /**
  * Allows retrieval of all Loan account transactions.l
  * 
  * @property {int} perPage - Pagination, index to start searching at when retrieving elements, used in combination with limit to paginate results
  * @property {int} page - Pagination, the number of elements to retrieve, used in combination with offset to paginate results
  * @property {int} loanAccountId - This describes the `id` of the loan account.
  * @returns
  */
  getAllLoanAccountTransactions({ perPage, page, loanAccountId } = {}) {
    const query = { perPage, page }
    const params = { loanAccountId }
    return this.wrapper({
      path: `/loans/${loanAccountId}/transactions`,
      method: 'get',
      query,
      params
    })
  }


  /**
  * 
  * 
  * @property {string} loanAccountId - This describes the `id` of the loan account.
  * @property {string} transactionId - This is the `id` of the transaction.
  * @returns
  */
  retrieveLoanAccountTransaction({ loanAccountId, transactionId } = {}) {
    const params = { loanAccountId, transactionId }
    return this.wrapper({
      path: `/loans/${loanAccountId}/transactions/${transactionId}`,
      method: 'get',
      params
    })
  }
}