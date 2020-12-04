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
    country_id,
    state,
    total,
    order,
  } = req.body

  const existingCountry = await countryDB.readById(country_id)
  
  if (existingCountry.state && !state) {
    return res.status(400).json({ error: 'state cannot be blank'})
  }
  
  order.itens.forEach(({ quantity }) => {
    if (!quantity ||quantity < 0) {
      return res.status(400).json({ error: 'quantity must be greater than 0'})
    }
  })
  
  let quantity = calculateOrderQuantity(order)
  let purchasePrice = await calculateTotalPurchase(order, quantity)

  if (total > purchasePrice) {
    return res.status(400).json({ error: 'total must be less than all book price'})
  }

  // const { id } = await orderDB.insert({ 
  //   discount_id,
  //   total, 
  //   itens: order.itens,
  // })

  // await purchaseDB.insert({ 
  //   order_id: id,
  //   ...req.body
  // })

  return res.status(201).json({ orderId: 'endereco-compra'})
}

function calculateOrderQuantity(aOrder) {
  return aOrder.itens
      .map(item => item.quantity)
      .reduce((acc, value) => acc + value)
}

async function calculateTotalPurchase(aOrder, aQuantity) {
  const books = await bookDB.find()
  let price = 0

  books.filter((book, index) => {
    if (book.id === aOrder.itens[index].idBook) {
      price = book.price * aQuantity
    }
  })

  return price
}


export { 
  registerOrder, 
  getOrder 
}