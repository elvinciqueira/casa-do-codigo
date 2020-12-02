import {buildRes, buildReq, buildBook} from '../../../test/utils/generate'
import * as bookController from '../../app/controllers/books-controller'
import Book from '../../app/models/book'

jest.mock('../../app/models/book')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createBook returns 200 with req.book', async () => {
  const book = buildBook()

  Book.create.mockResolvedValueOnce(book)

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).toHaveBeenCalledWith(book)
  expect(Book.create).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(book)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createBook returns 400 author cannot be blank', async () => {
  const book = buildBook()

  delete book.user_id

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "author cant be blank",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createBook returns 400 category cannot be blank', async () => {
  const book = buildBook()

  delete book.category_id

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "category cant be blank",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createBook returns 400 isbn cannot be blank', async () => {
  const book = buildBook()

  delete book.isbn

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "isbn cant be blank",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createBook returns 400 price cannot be blank', async () => {
  const book = buildBook()

  delete book.price

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "price cant be blank",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createBook returns 400 book already exists', async () => {
  const book = buildBook()
  const {title} = book

  Book.create.mockResolvedValueOnce(book)
  Book.findOne.mockResolvedValueOnce({where: {title}})

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).not.toHaveBeenCalled()

  expect(Book.findOne).toHaveBeenCalledWith({where: {title}})
  expect(Book.findOne).toHaveBeenCalledTimes(1)

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

  Book.findOne.mockResolvedValueOnce(existingBook)

  const req = buildReq({body: book})
  const res = buildRes()

  await bookController.createBook(req, res)

  expect(Book.create).not.toHaveBeenCalled()

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
