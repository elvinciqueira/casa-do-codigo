import { buildReq, buildRes, buildOrder, buildBook, buildCountry } from '../../../test/utils/generate'
import * as orderDB from '../../app/db/orders'
import * as bookDB from '../../app/db/books'
import * as countryDB from '../../app/db/countries'
import * as orderController from '../../app/controllers/order-controller'

jest.mock('../../app/db/orders')
jest.mock('../../app/db/books') 
jest.mock('../../app/db/countries')

beforeEach(() => {
  jest.clearAllMocks()
})

test('registerOder returns 201 with req.orderId', async () => {
  const order = buildOrder()
  const book = buildBook()
  const existingCountry = {
    id: 'some-id',
    state: order.state
  }

  orderDB.insert.mockResolvedValueOnce(order)
  bookDB.readById.mockResolvedValueOnce(book)
  countryDB.readById.mockResolvedValueOnce(existingCountry)

  const req = buildReq({body:order})
  const res = buildRes()

  await orderController.registerOrder(req, res)

  expect(orderDB.insert).toHaveBeenLastCalledWith(order)

  expect(res.status).toHaveBeenCalledWith(201)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith({ orderId: 'endereco-compra'})
  expect(res.json).toHaveBeenCalledTimes(1)
})