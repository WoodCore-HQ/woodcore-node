const wrapper = require("../utils/wrapper")

module.exports = class Products {
  constructor(config) {
    this.wrapper = wrapper(config)
  }

  /**
  * List all deposit products
  * 
  * @returns
  */
  listSavingsProduct() {
    return this.wrapper({
      path: `/savingsproducts`,
      method: 'get',
    })
  }


  /**
  * Allows retrieval of a single deposit product by its associated `id`.
  * 
  * @property {int} productId - This describes the `id` of the deposit product.
  * @returns
  */
  retrieveASavingsAccount({ productId } = {}) {
    const params = { productId }
    return this.wrapper({
      path: `/savingsproducts/${productId}`,
      method: 'get',
      params
    })
  }


  /**
  * Allows retrieval of all loan products.
  * 
  * @returns
  */
  listLoanProducts() {
    return this.wrapper({
      path: `/loanproducts`,
      method: 'get',
    })
  }


  /**
  * Allows retrieval of a specific loan product by its `id`.
  * @property {int} loanProductId
  * @returns
  */
  retrieveALoanProduct({ loanProductId }) {
    const params = { loanProductId }
    return this.wrapper({
      path: `/loanproducts/${loanProductId}`,
      method: 'get',
      params
    })
  }


  /**
  * List all fixed deposit products
  * 
  * @returns
  */
  listFixedDepositProducts() {
    return this.wrapper({
      path: `/fixeddepositproducts`,
      method: 'get',
    })
  }


  /**
  * Allows retrieval of a fixed deposit product by its Identifier.
  * 
  * @property {string} productId - This describes the `id` of the fixed deposit product.
  * @returns
  */
  retrieveAFixedDepositProduct({ productId } = {}) {
    const params = { productId }
    return this.wrapper({
      path: `/fixeddepositproducts/${productId}`,
      method: 'get',
      params
    })
  }
}