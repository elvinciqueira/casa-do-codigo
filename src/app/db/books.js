import Book from '../models/book'
import Category from '../models/category'
import User from '../models/user'

async function insert(book) {
  const result = await Book.create(book)

  return result
}

async function query(queryObj) {
  const result = await Book.findOne({where:queryObj})

  return result
}

async function readById(id) {
  const result = await Book.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'email']
      },
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  })

  return result
}

async function find() {
  const result = await Book.findAll()

  return result
}

async function drop() {
  await User.drop()
}

export {
  insert,
  query,
  drop,
  find,
  readById
}