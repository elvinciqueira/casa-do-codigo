import Country from '../models/country'
import State from '../models/state'
import Order from '../models/order'
import Book from '../models/book'
import Discount from '../models/discount'

async function readById(id) {
  const result = await Order.findByPk(id, { 
    include: [
      { 
        model: Discount,
        as: 'discount', 
        attributes: ['percentage']
      },
      { 
        model: Book,
        as: 'book',
      }
    ]
  })

  return result
}

async function insert(order) {
  const result = await Order.create(order)

  return result
}

export {
  readById,
  insert
}