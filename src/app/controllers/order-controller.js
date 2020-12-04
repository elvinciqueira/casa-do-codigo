import * as orderDB from '../db/orders'
import * as countryDB from '../db/countries'
import * as purchaseDB from '../db/purchases'
import * as bookDB from '../db/books'

async function getOrder(req, res) {
  const { id } = req.params
  
  const order = await orderDB.readById(id)
  
  return res.status(200).json(order)
}

async function registerOrder(req, res) {
  const {
    discount_id,
    itens,
    country_id,
    state,
    total,
    order,
  } = req.body

  const books = await bookDB.find()
  const existingCountry = await countryDB.readById(country_id)

  if (existingCountry.state && !state) {
    return res.status(400).json({ error: 'state cannot be blank'})
  }

  let quantity = 
    order.itens
    .map(item => item.quantity)
    .reduce((acc, value) => acc + value)

  let price = 0

  books.filter((book, index) => {
    if (book.id === order.itens[index].idBook) {
      price = book.price * quantity
    }
  })

  if (total > price) {
    return res.status(400).json({ error: 'total must be less than all book price'})
  }

  const order = await orderDB.insert({ 
    discount_id,
    book_id,
    total, 
    itens,
  })

  await purchaseDB.insert({ 
    order_id: order.id,
    ...req.body
  })

  return res.status(201).json({ orderId: price})
}


export { 
  registerOrder, 
  getOrder 
}