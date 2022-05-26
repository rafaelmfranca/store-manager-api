const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const { SalesModel } = require('../../../models');
const { sales, salesById } = require('../../__mocks__/sales');

describe('✅ SalesModel.js - getAll() function\n', () => {
  before(() => {
    const result = [sales, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with all sales', async () => {
      const response = await SalesModel.getAll();
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal(sales);
    });
  });
});

describe('✅ SalesModel.js - getById() function\n', () => {
  before(() => {
    const result = [salesById, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when executed', () => {
    it('should return an array', async () => {
      const response = await SalesModel.getById(1);
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with specified sale', async () => {
      const response = await SalesModel.getById(1);
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal(salesById);
    });
  });
});

describe('✅ SalesModel.js - create() function\n', () => {
  before(() => {
    const result = [{ insertId: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when is inserted successfully', () => {
    it('should return an array', async () => {
      const response = await SalesModel.create();
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain "insertId" property', async () => {
      const response = await SalesModel.create();
      expect(response[0]).to.haveOwnProperty('insertId');
      expect(response[0].insertId).to.be.equal(1);
    });
  });
});

describe('✅ SalesModel.js - remove() function\n', () => {
  before(() => {
    const result = [{ affectedRows: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when remove successfully', () => {
    it('should return an array', async () => {
      const response = await SalesModel.remove(1);
      expect(response).to.be.an('array');
    });

    it('should remove only one record', async () => {
      const response = await SalesModel.remove(1);
      expect(response[0]).to.haveOwnProperty('affectedRows');
      expect(response[0].affectedRows).to.be.equal(1);
    });
  });
});
