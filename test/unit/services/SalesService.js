const { expect } = require('chai');
const sinon = require('sinon');
const { productsRouter } = require('../../../controllers');
const connection = require('../../../db/connection');
const {
  SalesModel,
  SalesProductsModel,
  ProductsModel,
} = require('../../../models');
const { SalesService } = require('../../../services');
const { sales, salesById, productsToSale } = require('../../__mocks__/sales');
const { saleResume } = require('../../__mocks__/salesProducts');

describe('✅ SalesService.js - normalize() function\n', () => {
  describe('when executed', () => {
    it('should return an object', () => {
      const response = SalesService.normalize(sales[0]);
      expect(response).to.be.an('object');
    });

    it('the object has correct properties', () => {
      const response = SalesService.normalize(sales[0]);
      expect(response).to.haveOwnProperty('saleId');
      expect(response).to.haveOwnProperty('date');
      expect(response).to.haveOwnProperty('productId');
      expect(response).to.haveOwnProperty('quantity');
    });
  });
});

describe('✅ SalesService.js - getAll() function\n', () => {
  before(() => {
    sinon.stub(SalesModel, 'getAll').resolves([sales]);
  });

  after(() => {
    SalesModel.getAll.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await SalesService.getAll();
      expect(response).to.be.an('array');
    });
    it('the array containing all sales must be normalized', async () => {
      const response = await SalesService.getAll();
      expect(response).to.be.an('array');
      expect(response).to.deep.equal(sales.map(SalesService.normalize));
    });
  });
});

describe('✅ SalesService.js - getById() function\n', () => {
  describe('when sale doest not exist in the DB', () => {
    before(() => {
      sinon.stub(SalesModel, 'getById').resolves([[]]);
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('should return a boolean', async () => {
      const response = await SalesService.getById(1);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be false', async () => {
      const response = await SalesService.getById(1);
      expect(response).to.be.false;
    });
  });

  describe('when sale exists in the DB', () => {
    before(() => {
      sinon.stub(SalesModel, 'getById').resolves([salesById]);
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('should return an array', async () => {
      const response = await SalesService.getById(1);
      expect(response).to.be.an('array');
    });

    it('the array containing specified sale must be normalized', async () => {
      const response = await SalesService.getById(1);
      expect(response).to.be.an('array');
      expect(response).to.deep.equal(salesById.map(SalesService.normalize));
    });
  });
});

describe('✅ SalesService.js - create() function\n', () => {
  describe('when a product has no available quantity in stock', () => {
    before(() => {
      sinon
        .stub(connection, 'query')
        .resolves([[{ product_id: 1, quantity: 0 }], []]);
    });

    after(() => {
      connection.query.restore();
    });

    it('should return a boolean', async () => {
      const response = await SalesService.create([productsToSale[0]]);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be false', async () => {
      const response = await SalesService.create(productsToSale);
      expect(response).to.be.false;
    });
  });

  describe('when a product has available quantity in stock', () => {
    before(() => {
      sinon
        .stub(connection, 'query')
        .onFirstCall()
        .resolves([[{ product_id: 1, quantity: 2 }], []])
        .onSecondCall()
        .resolves([{ insertId: 3 }, []]);
    });

    after(() => {
      connection.query.restore();
    });

    it('the object has correct properties', async () => {
      const response = await SalesService.create([productsToSale[0]]);
      expect(response).to.haveOwnProperty('id');
      expect(response).to.haveOwnProperty('itemsSold');
    });
  });
});

describe('✅ SalesService.js - update() function\n', () => {
  before(() => {
    sinon.stub(SalesProductsModel, 'update').resolves();
  });

  after(() => {
    SalesProductsModel.update.restore();
  });

  describe('when executes', () => {
    it('should return an object', async () => {
      const response = await SalesService.update(1, productsToSale);
      expect(response).to.be.an('object');
    });

    it('the object has correct properties', async () => {
      const response = await SalesService.update(1, productsToSale);
      expect(response).to.haveOwnProperty('saleId');
      expect(response).to.haveOwnProperty('itemUpdated');
    });
  });
});

describe('✅ SalesService.js - remove() function\n', () => {
  describe('when sale does not exists in the DB', () => {
    before(() => {
      sinon.stub(SalesProductsModel, 'getSalesResumeBySaleId').resolves([[]]);
      sinon.stub(SalesModel, 'getById').resolves([[]]);
    });

    after(() => {
      SalesModel.getById.restore();
      SalesProductsModel.getSalesResumeBySaleId.restore();
    });

    it('should return a boolean', async () => {
      const response = await SalesService.remove(1);
      expect(response).to.be.a('boolean');
    });
    it('the boolean has to be false', async () => {
      const response = await SalesService.remove(1);
      expect(response).to.be.false;
    });
  });
  describe('when sale exists in the DB', () => {
    before(() => {
      sinon
        .stub(SalesProductsModel, 'getSalesResumeBySaleId')
        .resolves([saleResume]);
      sinon.stub(ProductsModel, 'updateQuantity').resolves();
      sinon.stub(SalesModel, 'getById').resolves([salesById]);
      sinon.stub(SalesModel, 'remove').resolves();
    });

    after(() => {
      SalesModel.getById.restore();
      ProductsModel.updateQuantity.restore();
      SalesProductsModel.getSalesResumeBySaleId.restore();
    });

    it('should return a boolean', async () => {
      const response = await SalesService.remove(1);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be true', async () => {
      const response = await SalesService.remove(1);
      expect(response).to.be.true;
    });
  });
});
