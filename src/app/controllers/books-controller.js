import Book from '../models/book'

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
  createBook
}