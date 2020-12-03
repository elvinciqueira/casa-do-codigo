import { buildReq, buildRes, buildOrder, buildBook } from '../../../test/utils/generate'
import Order from '../../app/models/order'
import Book from '../../app/models/book'
import Country from '../../app/models/country'
import * as orderController from '../../app/controllers/order-controller'

jest.mock('../../app/models/order')
jest.mock('../../app/models/country')
jest.mock('../../app/models/book')

beforeEach(() => {
  jest.clearAllMocks()
})

test('registerOder returns 201 with req.orderId', async () => {
  const order = buildOrder()
  const book = buildBook()
  const existingCountry = {
    state: order.state,
  }

  Order.create.mockResolvedValueOnce(order)
  Country.findByPk.mockResolvedValueOnce(existingCountry)
  Book.findByPk.mockResolvedValueOnce(book)

  const req = buildReq({body:order})
  const res = buildRes()

  await orderController.registerOrder(req, res)

  expect(res.status).toHaveBeenCalledWith(201)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith({ orderId: 'endereco-compra'})
  expect(res.json).toHaveBeenCalledTimes(1)
})