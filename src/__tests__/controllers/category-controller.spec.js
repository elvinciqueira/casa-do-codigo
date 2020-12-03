import {buildRes, buildReq, buildCategory} from '../../../test/utils/generate'
import * as categoryDB from '../../app/db/categories'
import * as categoryController from '../../app/controllers/category-controller'

jest.mock('../../app/db/categories')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createCategory returns 200 with req.category', async () => {
  const category = buildCategory()

  categoryDB.insert.mockResolvedValueOnce(category)

  const req = buildReq({body: category})
  const res = buildRes()

  await categoryController.createCategory(req, res)

  expect(categoryDB.insert).toHaveBeenCalledWith(category)
  expect(categoryDB.insert).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(category)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('createCategory returns 400 name cant be blank', async () => {
  const req = buildReq()
  const res = buildRes()

  await categoryController.createCategory(req, res)

  expect(categoryDB.insert).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "name cannot be blank ",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createCategory return 400 name already exists', async () => {
  const category = buildCategory()
  const {name} = category

  categoryDB.query.mockResolvedValueOnce({name})

  const req = buildReq({body: category})
  const res = buildRes()

  await categoryController.createCategory(req, res)

  expect(categoryDB.insert).not.toHaveBeenCalled()

  expect(categoryDB.query).toHaveBeenCalledWith({name})
  expect(categoryDB.query).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "Category already exists",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})
