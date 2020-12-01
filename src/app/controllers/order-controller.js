import Country from '../models/country'
import State from '../models/state'
import Order from '../models/order'
import Book from '../models/book'

async function registerOrder(req, res) {
  const {
    book_id,
    itens,
    country_id,
    state,
  } = req.body

  const book = await Book.findByPk(book_id)
  const orderQuantity = itens.map(item => item.quantity).reduce((accumulator, currentValue) => (accumulator + currentValue))
  const orderPrice = orderQuantity * Number(book.price);
  
  const existingCountry = await Country.findByPk(country_id, {
    include: [
      {
        model: State,
        as: 'state',
        attributes: ['name']
      }
    ]
  })

  if (existingCountry.state && !state) {
    return res.status(400).json({ error: 'state cannot be blank'})
  } 


  await Order.create({ 
    book_id,
    total: orderPrice,
    itens,
  })

  return res.status(201).json({ orderId: 'endereco-compra'})
}

export { registerOrder }