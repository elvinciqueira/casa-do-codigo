import {buildRes, buildReq, buildBook} from '../../../test/utils/generate'
import * as bookController from '../../app/controllers/books-controller'
import * as bookDB from '../../app/db/books'

jest.mock('../../app/db/books')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createBook returns 200 with req.book', async () => {
  const book = buildBook()

  delete book.id

  bookDB.insert.mockResolvedValueOnce(book)

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(bookDB.insert).toHaveBeenCalledWith(book)
  expect(bookDB.insert).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(book)
  expect(res.json).toHaveBeenCalledTimes(1)
})


test('createBook returns 400 book already exists', async () => {
  const book = buildBook()
  const {title} = book

  bookDB.query.mockResolvedValueOnce({title})

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(bookDB.insert).not.toHaveBeenCalled()

  expect(bookDB.query).toHaveBeenCalledWith({title})
  expect(bookDB.query).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "book already exists",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createBook returns 400 isbn already in use', async () => {
  const book = buildBook()

  const existingBook = {
    isbn: book.isbn,
  }

  bookDB.query.mockResolvedValueOnce(existingBook)

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(bookDB.insert).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "isbn already in use",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('setBook return 200 req.book', async () => {
  const book = buildBook()

  bookDB.readById.mockResolvedValueOnce(book.id)

  const req = buildBook({params: {id: book.id}})
  const res = buildRes()

  await bookController.setBook(req, res)

  expect(bookDB.readById).toBeCalledTimes(1)

  expect(res.status).toBeCalledWith(200)
  expect(res.status).toBeCalledTimes(1)

  expect(res.json).toBeCalledWith(book.id)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('setBook return 400 book not found', async () => {
  const req = buildReq()
  const res = buildRes()

  await bookController.setBook(req, res)

  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "book not found",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})
