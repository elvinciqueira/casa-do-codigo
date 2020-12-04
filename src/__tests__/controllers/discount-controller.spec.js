import {buildRes, buildReq, buildDiscount} from '../../../test/utils/generate'
import * as discountDB from '../../app/db/discounts'
import * as discountController from '../../app/controllers/discount-controller'

jest.mock('../../app/db/discounts')

beforeEach(() => {
  jest.clearAllMocks()
})

test('registerDiscount returns 200 with req.discount', async () => {
  const discount = buildDiscount()

  discountDB.insert.mockResolvedValueOnce(discount)

  const req = buildReq({body: discount})
  const res = buildRes()

  await discountController.registerDiscount(req, res)

  expect(discountDB.insert).toHaveBeenCalledWith(discount)
  expect(discountDB.insert).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(discount)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('registerDiscount returns 400 with code invalid', async () => {
  const discount = buildDiscount()

  delete discount.code

  discountDB.insert.mockResolvedValueOnce(discount)

  const req = buildReq({body: discount})
  const res = buildRes()

  await discountController.registerDiscount(req, res)

  expect(discountDB.insert).not.toHaveBeenCalledWith(discount)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "Code is invalid",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('registerDiscount returns 400 percentage must be grater than 0', async () => {
  const discount = buildDiscount()

  delete discount.percentage

  discountDB.insert.mockResolvedValueOnce(discount)

  const req = buildReq({body: discount})
  const res = buildRes()

  await discountController.registerDiscount(req, res)

  expect(discountDB.insert).not.toHaveBeenCalledWith(discount)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "percetage must be greater than 0",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('registerDiscount returns 400 code in use', async () => {
  const discount = buildDiscount()
  const {code} = discount

  discountDB.query.mockResolvedValueOnce({code})

  const req = buildReq({body: discount})
  const res = buildRes()

  await discountController.registerDiscount(req, res)

  expect(discountDB.query).toHaveBeenCalledWith({code})
  expect(discountDB.query).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "code in use",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)
})
