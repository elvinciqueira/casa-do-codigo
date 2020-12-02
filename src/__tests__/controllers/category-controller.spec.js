import {buildRes, buildReq, buildCategory} from '../../../test/utils/generate'
import Category from '../../app/models/category'
import * as categoryController from '../../app/controllers/category-controller'

jest.mock('../../app/models/category')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createCategory returns 200 with req.category', async () => {
  const category = buildCategory()

  Category.create.mockResolvedValueOnce(category)

  const req = buildReq({body: category})
  const res = buildRes()

  await categoryController.createCategory(req, res)

  expect(Category.create).toHaveBeenCalledWith(category)
  expect(Category.create).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(category)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('createCategory returns 400 name cant be blank', async () => {
  const req = buildReq()
  const res = buildRes()

  await categoryController.createCategory(req, res)

  expect(Category.create).not.toHaveBeenCalled()

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

  Category.create.mockResolvedValueOnce(name)
  Category.findOne.mockResolvedValueOnce({where: {name}})

  const req = buildReq({body: category})
  const res = buildRes()

  await categoryController.createCategory(req, res)

  expect(Category.create).not.toHaveBeenCalled()

  expect(Category.findOne).toHaveBeenCalledWith({where: {name}})
  expect(Category.findOne).toHaveBeenCalledTimes(1)

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
