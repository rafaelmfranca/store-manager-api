const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const { SalesProductsModel } = require('../../../models');
const { testSale, saleResume } = require('../../__mocks__/salesProducts');

const { saleId, productId, quantity } = testSale;

describe('✅ SalesProductsModel.js - create() function\n', () => {
  before(() => {
    const result = [{ insertId: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when is inserted successfully', () => {
    it('should return an array', async () => {
      const response = await SalesProductsModel.create(
        saleId,
        productId,
        quantity,
      );
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain "insertId" property', async () => {
      const response = await SalesProductsModel.create(
        saleId,
        productId,
        quantity,
      );
      expect(response[0]).to.haveOwnProperty('insertId');
      expect(response[0].insertId).to.be.equal(1);
    });
  });
});

describe('✅ SalesProductsModel.js - update() function\n', () => {
  before(() => {
    const result = [{ affectedRows: 1 }, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when is inserted successfully', () => {
    it('should return an array', async () => {
      const response = await SalesProductsModel.update(
        saleId,
        productId,
        quantity,
      );
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain "affectedRows" property', async () => {
      const response = await SalesProductsModel.update(
        saleId,
        productId,
        quantity,
      );
      expect(response[0]).to.haveOwnProperty('affectedRows');
      expect(response[0].affectedRows).to.be.equal(1);
    });
  });
});

describe('✅ SalesProductsModel.js - getSalesResumeBySaleId() function\n', () => {
  before(() => {
    const result = [saleResume, []];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  describe('when executes', () => {
    it('should return an array', async () => {
      const response = await SalesProductsModel.getSalesResumeBySaleId(
        saleId,
        productId,
        quantity,
      );
      expect(response).to.be.an('array');
    });

    it('the array in position 0 should contain another array with sale resume', async () => {
      const response = await SalesProductsModel.getSalesResumeBySaleId(
        saleId,
        productId,
        quantity,
      );
      expect(response[0]).to.be.an('array');
      expect(response[0]).to.deep.equal(saleResume);
    });
  });
});
