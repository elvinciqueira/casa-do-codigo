import * as orderDB from '../db/orders'
import * as bookDB from '../db/books'
import * as countryDB from '../db/countries'

async function getOrder(req, res) {
  const { id } = req.params
  
  const order = await orderDB.readById(id)
  
  if (order.discount_id) {
    const discount = order.total - (order.total * (order.discount.percentage / 100))
    order.total = discount
  }

  return res.status(200).json(order)
}

async function registerOrder(req, res) {
  const {
    book_id,
    discount_id,
    itens,
    country_id,
    state,
  } = req.body

  const book = await bookDB.readById(book_id)

  const existingCountry = await countryDB.readById(country_id)

  if (existingCountry.state && !state) {
    return res.status(400).json({ error: 'state cannot be blank'})
  } 

  await orderDB.insert({ 
    discount_id,
    book_id,
    total: calculateBookPrice(itens, book),
    itens,
  })

  return res.status(201).json({ orderId: 'endereco-compra'})
}

function calculateBookPrice(itens, book) {
  const itemQuantity = itens
    .map(item => item.quantity)
    .reduce((accumulator, currentValue) => (accumulator + currentValue))
  const result = (itemQuantity * Number(book.price));

  return result
}

export { 
  registerOrder, 
  getOrder 
}