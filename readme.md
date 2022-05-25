# Woodcore-node

This package provides easy access to WoodCore's Core Banking APIs.

## Installation

```bash
  $ npm install @woodcore/woodcore-node --save
```

## Usage

The package needs to be configured with a secret key gotten from the woodcore's dashboard.
Require and initialize the woodcore package and you're good to go.

```js
const WoodCore = require("@woodcore/woodcore-node");
const woodcore = new WoodCore("wc_test_......");
```

Each method returns a promise

```js
const WoodCore = require("@woodcore/woodcore-node");
const woodcore = new WoodCore("wc_test_......");

woodcore.clients.retrieveCustomers()
  .then(({ status, message, data }) => {
    console.log(status, message, data)
  })
  .catch((error) => {
    console.error(error)
  })
```

```js
const WoodCore = require("@woodcore/woodcore-node");
const woodcore = new WoodCore("wc_test_......");

(async() => {
  try {
    const { status, message, data } = await woodcore.clients.retrieveCustomers();
    console.log(status, message, data)
  } catch (error) {
    console.error(error)
  }
})()
```

## Pagination with Async Iterators

You can auto paginate through data using async itration on Node 10+

```js
const WoodCore = require("@woodcore/woodcore-node");
const woodcore = new WoodCore("wc_test_......");

(async() => {
  try {
    for await (const { status, message, data } of woodcore.clients.retrieveCustomers()) {
      console.log(status, message, data);
      // dont forget to break out of the loop to avoid wasting system resources.
      // example, break out if we get a success.
      if (status === '01') break;
    }
  } catch (error) {
    console.error(error)
  }
})();
```

## Methods

> The package exposes the following methods which are properly defined and documented. 

- clients
  - woodcore.clients.createIndividualClient()
  - woodcore.clients.activateClient()
  - woodcore.clients.changeClientTier()
  - woodcore.clients.retrieveCustomers()
  - woodcore.clients.retrieveClient()
  - woodcore.clients.listCustomersAccounts()
- savings
  - woodcore.savings.createSavingsAccount()
  - woodcore.savings.activateSavingsAccount()
  - woodcore.savings.listSavingsAccount()
  - woodcore.savings.retrieveASavingsAccount()
  - woodcore.savings.makeDepositSavingsAccountTransaction()
  - woodcore.savings.makeWithdrawalSavingsAccountTransaction()
  - woodcore.savings.undoreverseSavingsAccountTransaction()
  - woodcore.savings.listAllTransactions()
  - woodcore.savings.retrieveSavingsAccountTransaction()
  - woodcore.savings.lienAmountFromSavingsAccount()
  - woodcore.savings.releaseLienAmountOnSavingsAccount()
  - woodcore.savings.listAllLienOnSavingsAccount()
  - woodcore.savings.blockSavingsAccount()
  - woodcore.savings.unblockSavingsAccount()
  - woodcore.savings.postNoDebitPndOnSavingsAccount()
  - woodcore.savings.unblockPncOnSavingsAccount()
  - woodcore.savings.postNoCreditPncOnSavingsAccount()
  - woodcore.savings.unblockPndOnSavingsAccount()
  - woodcore.savings.listSavingsAccountCharges()
  - woodcore.savings.retrieveSavingsAccountCharge()
  - woodcore.savings.createAFixedDepositAccountApplication()
  - woodcore.savings.activateFixedDepositAccount()
  - woodcore.savings.closeFixedDepositAccount()
  - woodcore.savings.preMatureCloseFixedDepositAccount()
  - woodcore.savings.listFixedDepositAccounts()
  - woodcore.savings.retrieveFixedDepositAccount()
- products
  - woodcore.products.listSavingsProduct()
  - woodcore.products.retrieveASavingsAccount()
  - woodcore.products.listLoanProducts()
  - woodcore.products.retrieveALoanProduct()
  - woodcore.products.listFixedDepositProducts()
  - woodcore.products.retrieveAFixedDepositProduct()
- loans
  - woodcore.loans.calculateLoan()
  - woodcore.loans.createALoanAccount()
  - woodcore.loans.approveLoanAccount()
  - woodcore.loans.undoApprovalForLoanAccount()
  - woodcore.loans.disburseLoan()
  - woodcore.loans.disburseLoanToSavings()
  - woodcore.loans.undoDisburseLoan()
  - woodcore.loans.retrieveAllLoanAccount()
  - woodcore.loans.retrieveLoanAccount()
  - woodcore.loans.makeRepaymentForLoan()
  - woodcore.loans.foreclosureOfAnActiveLoan()
  - woodcore.loans.waiveInterestOnLoanAccount()
  - woodcore.loans.writeOffLoan()
  - woodcore.loans.undoWriteOffForLoan()
  - woodcore.loans.getAllLoanAccountTransactions()
  - woodcore.loans.retrieveLoanAccountTransaction()
- accounting
  - woodcore.accounting.createGeneralLedgerAccount()
  - woodcore.accounting.retrieveAllGeneralLedgerAccounts()
  - woodcore.accounting.retrieveGeneralLedgerAccount()
  - woodcore.accounting.ledgerToLedger()
  - woodcore.accounting.reverseJournalEntry()
  - woodcore.accounting.customerToLedger()
  - woodcore.accounting.retrieveAllJournalEntries()
  - woodcore.accounting.retrieveJournalEntry()
- intraTransfer
  - woodcore.intraTransfer.createIntraTransfer()
  - woodcore.intraTransfer.listAccountTransfers()
  - woodcore.intraTransfer.retrieveIntraTransfer()