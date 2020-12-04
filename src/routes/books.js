import express from 'express'
import * as booksController from '../app/controllers/books-controller'
import bookValidator from '../app/middlewares/validators/bookStore'

function getBooksRoutes() {
  const router = express.Router()

  router.post('/', bookValidator, booksController.createBook)
  router.get('/', booksController.getBooks)

  return router
}

export default getBooksRoutes