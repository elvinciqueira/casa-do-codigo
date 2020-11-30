import Book from '../models/book'
import User from '../models/user'
import Category from '../models/category'

import bookView from '../views/books_views'

async function setBook(req, res) {
  const { id } = req.params

  const book = await Book.findByPk(id, {
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

  if (!book) {
    return res.status(404).json({ error: 'book not found'})
  }

  return res.json(book)
}

async function getBooks(req, res) {
  const books = await Book.findAll()

  return res.json({ books: bookView.renderMany(books)})
}

async function createBook(req, res) {
  const { 
    title,
    brief,
    user_id,
    category_id,
    pages,
    isbn,
    price,
    summary,
    date_publication,
  } = req.body

  if (!category_id || !user_id) {
    return res.status(400).json({ error: 'user/category cant be blank'})
  }

  if (!isbn) {
    return res.status(400).json({ error: 'isbn cant be blank'})
  }

  if (!price) {
    return res.status(400).json({ error: 'price cant be blank'})
  }

  const existingIsbn = await Book.findOne({ where: { isbn }})

  if (existingIsbn) {
    return res.status(400).json({ error: 'book already exists'})
  }

  const existingBook = await Book.findOne({ where: {title} })

  if (existingBook) {
    return res.status(400).json({ error: 'book already exists'})
  }

  const book = await Book.create({
    title,
    brief,
    user_id,
    category_id,
    pages,
    isbn,
    price,
    summary,
    date_publication
  })

  return res.json(book)
}

export {
  createBook,
  getBooks,
  setBook
}