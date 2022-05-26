const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const { ProductsModel } = require('../../../models');
const { products, testProduct } = require('../../__mocks__/products');

const { id, name, quantity } = testProduct;

describe('✅ ProductsModel.js - getAll() function\n', () => {
  before(() => {
    const result = [products, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with all products', async () => {
      const response = await ProductsModel.getAll();
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal(products);
    });
  });
});

describe('✅ ProductsModel.js - getById() function\n', () => {
  before(() => {
    const result = [[products[0]], []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.getById(id);
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with specified product', async () => {
      const response = await ProductsModel.getById(id);
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal([products[0]]);
    });
  });
});

describe('✅ ProductsModel.js - getByName() function\n', () => {
  before(() => {
    const result = [[testProduct], []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.getByName(name);
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with specified product', async () => {
      const response = await ProductsModel.getByName(name);
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal([testProduct]);
    });
  });
});

describe('✅ ProductsModel.js - create() function\n', () => {
  before(() => {
    const result = [{ insertId: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when is inserted successfully', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.create(name, quantity);
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain "insertId" property', async () => {
      const response = await ProductsModel.create(name, quantity);
      expect(response[0]).to.haveOwnProperty('insertId');
      expect(response[0].insertId).to.be.equal(1);
    });
  });
});

describe('✅ ProductsModel.js - update() function\n', () => {
  before(() => {
    const result = [{ affectedRows: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when is it updated successfully', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.update(id, name, quantity);
      expect(response).to.be.an('array');
    });

    it('should update only one record', async () => {
      const response = await ProductsModel.update(id, name, quantity);
      expect(response[0]).to.haveOwnProperty('affectedRows');
      expect(response[0].affectedRows).to.be.equal(1);
    });
  });
});

describe('✅ ProductsModel.js - remove() function\n', () => {
  before(() => {
    const result = [{ affectedRows: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when it is successfully removed', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.remove(id);
      expect(response).to.be.an('array');
    });

    it('should remove only one record', async () => {
      const response = await ProductsModel.remove(id);
      expect(response[0]).to.haveOwnProperty('affectedRows');
      expect(response[0].affectedRows).to.be.equal(1);
    });
  });
});

describe('✅ ProductsModel.js - updateQuantity() function\n', () => {
  before(() => {
    const result = [{ affectedRows: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when update successfully', () => {
    it('should return an array', async () => {
      const response = await ProductsModel.updateQuantity(id, quantity, '-');
      expect(response).to.be.an('array');
    });

    it('should update only one record', async () => {
      const response = await ProductsModel.updateQuantity(id, quantity, '-');
      expect(response[0]).to.haveOwnProperty('affectedRows');
      expect(response[0].affectedRows).to.be.equal(1);
    });
  });
});
