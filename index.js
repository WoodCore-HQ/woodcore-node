const Accounting = require('./collections/accounting');
const Clients = require('./collections/clients');
const IntraTransfer = require('./collections/intratransfer');
const Loans = require('./collections/Loans');
const Products = require('./collections/products');
const Savings = require('./collections/savings');

class WoodCore {
  constructor(key) {
    if (!key) throw new Error('API Key is required')
    this.key = key;
    this.env = this.key.startsWith("wc_test") ? "test" : "prod"
    this.baseURL = this.env === "test" ? 'https://spark.test.woodcoreapp.com/api/v2' : 'https://spark.woodcoreapp.com/api/v2'
    this.config = { key: this.key, baseURL: this.baseURL }
  }

  get accounting() {
    const accounting = new Accounting(this.config)
    return accounting
  }

  get clients() {
    const clients = new Clients(this.config)
    return clients
  }

  get intraTransfer() {
    const intraTransfer = new IntraTransfer(this.config)
    return intraTransfer
  }

  get loans() {
    const loans = new Loans(this.config)
    return loans
  }

  get products() {
    const products = new Products(this.config)
    return products
  }

  get savings() {
    const savings = new Savings(this.config)
    return savings
  }
}

module.exports = WoodCore