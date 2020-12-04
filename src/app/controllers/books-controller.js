import * as bookDB from '../db/books'

import bookView from '../views/books_views'

async function setBook(id) {
  const book = await bookDB.readById(id)

  if (!book) {
    return res.status(404).json({ error: 'book not found'})
  }

  return book
}

async function getBooks(req, res) {
  const books = await bookDB.find()

  return res.status(200).json({ books: bookView.renderMany(books)})
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

  const existingBook = await bookDB.query({title})

  if (isbn === (existingBook && existingBook.isbn)) {
    return res.status(400).json({ error: 'isbn already in use'})
  }

  if (existingBook) {
    return res.status(400).json({ error: 'book already exists'})
  }

  const book = await bookDB.insert({
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

  return res.status(200).json(book)
}

export {
  createBook,
  getBooks,
  setBook
}