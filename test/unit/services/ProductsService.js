const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const { ProductsModel } = require('../../../models');
const { ProductsService } = require('../../../services');
const { products, testProduct } = require('../../__mocks__/products');

describe('✅ ProductsService.js - getAll() function\n', () => {
  before(() => {
    sinon.stub(ProductsModel, 'getAll').resolves([products]);
  });

  after(() => {
    ProductsModel.getAll.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await ProductsService.getAll();
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with all products', async () => {
      const response = await ProductsService.getAll();
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal(products);
    });
  });
});

describe('✅ ProductsService.js - getById() function\n', () => {
  before(() => {
    sinon.stub(ProductsModel, 'getById').resolves([[testProduct]]);
  });

  after(() => {
    ProductsModel.getById.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await ProductsService.getById();
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with specified product', async () => {
      const response = await ProductsService.getById();
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal([testProduct]);
    });
  });
});

describe('✅ ProductsService.js - create() function\n', () => {
  describe('when product already exists in the DB', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getByName').resolves([[testProduct]]);
    });

    after(() => {
      ProductsModel.getByName.restore();
    });

    it('should return a boolean', async () => {
      const response = await ProductsService.create(testProduct);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be false', async () => {
      const response = await ProductsService.create(testProduct);
      expect(response).to.be.false;
    });
  });

  describe('when is inserted successfully', () => {
    before(() => {
      const result = [{ insertId: 1 }, []];
      sinon.stub(ProductsModel, 'getByName').resolves([[]]);
      sinon.stub(ProductsModel, 'create').resolves(result);
    });

    after(() => {
      ProductsModel.getByName.restore();
      ProductsModel.create.restore();
    });

    it('should return an object', async () => {
      const response = await ProductsService.create(testProduct);
      expect(response).to.be.an('object');
    });

    it('the object has correct properties', async () => {
      const response = await ProductsService.create(testProduct);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
});

describe('✅ ProductsService.js - update() function\n', () => {
  describe('when product doest not exist in the DB', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves([[]]);
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it('should return a boolean', async () => {
      const response = await ProductsService.update(1, testProduct);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be false', async () => {
      const response = await ProductsService.update(1, testProduct);
      expect(response).to.be.false;
    });
  });

  describe('when is it updated successfully', () => {
    before(() => {
      const result = [{ insertId: 1 }, []];
      sinon.stub(ProductsModel, 'getById').resolves([[testProduct]]);
      sinon.stub(ProductsModel, 'update').resolves(result);
    });

    after(() => {
      ProductsModel.getById.restore();
      ProductsModel.update.restore();
    });

    it('should return an object', async () => {
      const response = await ProductsService.update(1, testProduct);
      expect(response).to.be.an('object');
    });

    it('the object has the correct properties', async () => {
      const response = await ProductsService.update(1, testProduct);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
});

describe('✅ ProductsService.js - remove() function\n', () => {
  describe('when product doest not exist in the DB', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves([[]]);
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it('should return a boolean', async () => {
      const response = await ProductsService.remove(1);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be false', async () => {
      const response = await ProductsService.remove(1);
      expect(response).to.be.false;
    });
  });

  describe('when is it successfully removed', () => {
    before(() => {
      const result = [{ insertId: 1 }, []];
      sinon.stub(ProductsModel, 'getById').resolves([[testProduct]]);
      sinon.stub(ProductsModel, 'remove').resolves(result);
    });

    after(() => {
      ProductsModel.getById.restore();
      ProductsModel.remove.restore();
    });

    it('should return a boolean', async () => {
      const response = await ProductsService.remove(1);
      expect(response).to.be.a('boolean');
    });

    it('the boolean has to be true', async () => {
      const response = await ProductsService.remove(1);
      expect(response).to.be.true;
    });
  });
});
