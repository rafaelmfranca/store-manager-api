const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/ProductsController');
const { ProductsService } = require('../../../services');
const { products, testProduct } = require('../../__mocks__/products');

const req = {};
const res = {};

describe('✅ ProductsController.js - getAll() function\n', () => {
  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(ProductsService, 'getAll').resolves([products]);
  });

  after(() => {
    ProductsService.getAll.restore();
    sinon.restore();
  });

  it('res was called with "200" status code', async () => {
    await ProductsController.getAll(req, res);
    expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
  });

  it('res was called with correct message', async () => {
    await ProductsController.getAll(req, res);
    expect(res.json.calledWith(products)).to.be.true;
  });
});

describe('✅ ProductsController.js - create() function\n', () => {
  describe('when product already exists in the DB', () => {
    before(() => {
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'create').resolves(false);
    });

    after(() => {
      ProductsService.create.restore();
      sinon.restore();
    });

    it('res was called with "409" status code and correct message', async () => {
      await ProductsController.create(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.CONFLICT,
          message: 'Product already exists',
        }),
      ).to.be.true;
    });
  });

  describe('when product does not exists in the DB', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'create').resolves(testProduct);
    });

    after(() => {
      ProductsService.create.restore();
      sinon.restore();
    });

    it('res was called with "201" status code', async () => {
      await ProductsController.create(req, res, next);
      expect(res.status.calledWith(StatusCodes.CREATED)).to.be.true;
    });

    it('res was called with correct message', async () => {
      await ProductsController.create(req, res, next);
      expect(res.json.calledWith(testProduct)).to.be.true;
    });
  });
});

describe('✅ ProductsController.js - getById() function\n', () => {
  describe('when product does not exists in the DB', () => {
    before(() => {
      next = sinon.stub().returns();
      req.params = { id: 1 };

      sinon.stub(ProductsService, 'getById').resolves([[]]);
    });

    after(() => {
      ProductsService.getById.restore();
      sinon.restore();
    });

    it('res was called with "404" status code and correct message', async () => {
      await ProductsController.getById(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.NOT_FOUND,
          message: 'Product not found',
        }),
      ).to.be.true;
    });
  });

  describe('when product exists in the DB', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'getById').resolves([[testProduct]]);
    });

    after(() => {
      ProductsService.getById.restore();
      sinon.restore();
    });

    it('res was called with "200" status code', async () => {
      await ProductsController.getById(req, res, next);
      expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('res was called with correct message', async () => {
      await ProductsController.getById(req, res, next);
      expect(res.json.calledWith(testProduct)).to.be.true;
    });
  });
});

describe('✅ ProductsController.js - update() function\n', () => {
  describe('when product does not exists in the DB', () => {
    before(() => {
      next = sinon.stub().returns();
      req.params = { id: 1 };
      req.body = testProduct;

      sinon.stub(ProductsService, 'update').resolves(false);
    });

    after(() => {
      ProductsService.update.restore();
      sinon.restore();
    });

    it('res was called with "404" status code and correct message', async () => {
      await ProductsController.update(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.NOT_FOUND,
          message: 'Product not found',
        }),
      ).to.be.true;
    });
  });

  describe('when product exists in the DB', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'update').resolves(testProduct);
    });

    after(() => {
      ProductsService.update.restore();
      sinon.restore();
    });

    it('res was called with "200" status code', async () => {
      await ProductsController.update(req, res, next);
      expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('res was called with correct message', async () => {
      await ProductsController.update(req, res, next);
      expect(res.json.calledWith(testProduct)).to.be.true;
    });
  });
});

describe('✅ ProductsController.js - remove() function\n', () => {
  describe('when product does not exists in the DB', () => {
    before(() => {
      next = sinon.stub().returns();
      req.params = { id: 1 };

      sinon.stub(ProductsService, 'remove').resolves(false);
    });

    after(() => {
      ProductsService.remove.restore();
      sinon.restore();
    });

    it('res was called with "404" status code and correct message', async () => {
      await ProductsController.remove(req, res, next);
      expect(
        next.calledWith({
          status: StatusCodes.NOT_FOUND,
          message: 'Product not found',
        }),
      ).to.be.true;
    });
  });

  describe('when product exists in the DB', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'remove').resolves(true);
    });

    after(() => {
      ProductsService.remove.restore();
      sinon.restore();
    });

    it('res was called with "204" status code', async () => {
      await ProductsController.remove(req, res, next);
      expect(res.status.calledWith(StatusCodes.NO_CONTENT)).to.be.true;
    });
  });
});
