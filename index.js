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
    return new Accounting(this.config)
  }

  get clients() {
    return new Clients(this.config)
  }

  get intraTransfer() {
    return new IntraTransfer(this.config)
  }

  get loans() {
    return new Loans(this.config)
  }

  get products() {
    return new Products(this.config)
  }

  get savings() {
    return new Savings(this.config)
  }
}

module.exports = WoodCore