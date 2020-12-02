import {buildRes, buildReq, buildUser} from '../../../test/utils/generate'
import User from '../../app/models/user'
import * as userController from '../../app/controllers/user-controller'

jest.mock('../../app/models/user')

beforeEach(() => {
  jest.clearAllMocks()
})

test('register returns status 200 with user data', async () => {
  const user = buildUser()

  const req = buildReq({body: user})
  const res = buildRes()

  User.create.mockResolvedValueOnce(user)

  await userController.register(req, res)

  expect(User.create).toHaveBeenCalledWith(user)
  expect(User.create).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(user)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('register returns 400 if name/email is not provided', async () => {
  const req = buildReq()
  const res = buildRes()

  await userController.register(req, res)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "name/email cannot be blank",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('register return 400 if user already exists', async () => {
  const user = buildUser()
  const {email} = user

  User.create.mockResolvedValueOnce(user)
  User.findOne.mockResolvedValueOnce({where: {email}})

  const req = buildReq({body: user})
  const res = buildRes()

  await userController.register(req, res)

  expect(User.findOne).toHaveBeenCalledWith({where: {email}})
  expect(User.findOne).toHaveBeenCalledTimes(1)

  expect(User.create).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "User already exists",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})
