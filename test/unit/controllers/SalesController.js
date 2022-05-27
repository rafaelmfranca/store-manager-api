const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const SalesController = require('../../../controllers/SalesController');
const { SalesService } = require('../../../services');
const { sales, productsToSale, salesById } = require('../../__mocks__/sales');
const {
  salesResume,
  updatedSaleResume,
} = require('../../__mocks__/salesProducts');

const req = {};
const res = {};

describe('✅ SalesController.js - getAll() function\n', () => {
  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(SalesService, 'getAll').resolves(sales);
  });

  after(() => {
    SalesService.getAll.restore();
    sinon.restore();
  });

  it('res was called with "200" status code', async () => {
    await SalesController.getAll(req, res);
    expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
  });

  it('res was called with correct message', async () => {
    await SalesController.getAll(req, res);
    expect(res.json.calledWith(sales)).to.be.true;
  });
});

describe('✅ SalesController.js - create() function\n', () => {
  describe('when a product has no available quantity in stock', () => {
    before(() => {
      req.body = productsToSale;

      next = sinon.stub().returns();

      sinon.stub(SalesService, 'create').resolves(false);
    });

    after(() => {
      SalesService.create.restore();
      sinon.restore();
    });

    it('next was called with "422" status code and correct message', async () => {
      await SalesController.create(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.UNPROCESSABLE_ENTITY,
          message: 'Such amount is not permitted to sell',
        }),
      ).to.be.true;
    });
  });

  describe('when a product available quantity in stock', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = productsToSale;

      next = sinon.stub().returns();

      sinon.stub(SalesService, 'create').resolves(salesResume);
    });

    after(() => {
      SalesService.create.restore();
      sinon.restore();
    });

    it('res was called with "201" status code', async () => {
      await SalesController.create(req, res);
      expect(res.status.calledWith(StatusCodes.CREATED)).to.be.true;
    });

    it('res was called with correct message', async () => {
      await SalesController.create(req, res);
      expect(res.json.calledWith(salesResume)).to.be.true;
    });
  });
});

describe('✅ SalesController.js - getById() function\n', () => {
  describe('when specified product does not exists in the DB', () => {
    before(() => {
      req.params = { id: 1 };
      next = sinon.stub().returns();

      sinon.stub(SalesService, 'getById').resolves(false);
    });

    after(() => {
      SalesService.getById.restore();
      sinon.restore();
    });

    it('next was called with "404" status code and correct message', async () => {
      await SalesController.getById(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.NOT_FOUND,
          message: 'Sale not found',
        }),
      ).to.be.true;
    });
  });

  describe('when specified product exists in the DB', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 1 };

      next = sinon.stub().returns();

      sinon.stub(SalesService, 'getById').resolves(salesById);
    });

    after(() => {
      SalesService.getById.restore();
      sinon.restore();
    });

    it('res was called with "200" status code', async () => {
      await SalesController.getById(req, res, next);
      expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('res was called with correct message', async () => {
      await SalesController.getById(req, res, next);
      expect(res.json.calledWith(salesById)).to.be.true;
    });
  });
});

describe('✅ SalesController.js - update() function\n', () => {
  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    req.params = { id: 1 };
    req.body = [productsToSale[0]];

    sinon.stub(SalesService, 'update').resolves(updatedSaleResume);
  });

  after(() => {
    SalesService.update.restore();
    sinon.restore();
  });

  it('res was called with "200" status code', async () => {
    await SalesController.update(req, res);
    expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
  });

  it('res was called with correct message', async () => {
    await SalesController.update(req, res);
    expect(res.json.calledWith(updatedSaleResume)).to.be.true;
  });
});

describe('✅ SalesController.js - remove() function\n', () => {
  describe('when specified product does not exists in the DB', () => {
    before(() => {
      req.params = { id: 1 };
      next = sinon.stub().returns();

      sinon.stub(SalesService, 'remove').resolves(false);
    });

    after(() => {
      SalesService.remove.restore();
      sinon.restore();
    });

    it('next was called with "404" status code and correct message', async () => {
      await SalesController.remove(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.NOT_FOUND,
          message: 'Sale not found',
        }),
      ).to.be.true;
    });
  });

  describe('when specified product exists in the DB', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      next = sinon.stub().returns();

      req.params = { id: 1 };

      sinon.stub(SalesService, 'remove').resolves(true);
    });

    after(() => {
      SalesService.remove.restore();
      sinon.restore();
    });

    it('res was called with "204" status code', async () => {
      await SalesController.remove(req, res, next);
      expect(res.status.calledWith(StatusCodes.NO_CONTENT)).to.be.true;
    });
  });
});
