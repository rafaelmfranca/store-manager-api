const testSale = { saleId: 1, productId: 1, quantity: 1 };

const saleResume = [
  { product_id: 1, quantity: 5 },
  { product_id: 2, quantity: 10 },
];

const salesResume = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const updatedSaleResume = {
  saleId: 1,
  itemUpdated: [
    {
      productId: 1,
      quantity: 2,
    },
  ],
};

module.exports = { testSale, saleResume, salesResume, updatedSaleResume };
