import express from 'express'
import * as booksController from '../app/controllers/books-controller'

function getBooksRoutes() {
  const router = express.Router()

  router.post('/', booksController.createBook)
  router.get('/', booksController.getBooks)
  router.get('/:id', booksController.setBook)

  return router
}

export default getBooksRoutes