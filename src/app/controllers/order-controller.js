import Country from '../models/country'
import State from '../models/state'
import Order from '../models/order'
import Book from '../models/book'
import Discount from '../models/discount'

async function registerOrder(req, res) {
  const {
    book_id,
    discount_id,
    itens,
    country_id,
    state,
  } = req.body

  const book = await Book.findByPk(book_id)
  const orderQuantity = itens
    .map(item => item.quantity)
    .reduce((accumulator, currentValue) => (accumulator + currentValue))
  const orderPrice = (orderQuantity * Number(book.price));
  
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
    discount_id,
    book_id,
    total: orderPrice,
    itens,
  })

  return res.status(201).json({ orderId: 'endereco-compra'})
}

async function registerDiscount(req, res) {
  const { code, percentage, expiration } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Code is invalid'})
  }

  if (!percentage || percentage < 0) {
    return res.status(400).json({ error: 'percetage must be greater than 0'})
  }

  const existingDiscount = await Discount.findOne({
    where: { code }
  })

  if (existingDiscount) {
    return res.status(400).json({ error: 'code in use'})
  }

  const discount = await Discount.create({ 
    code, 
    percentage, 
    expiration
  })

  return res.status(200).json(discount)
}

export { registerOrder, registerDiscount }