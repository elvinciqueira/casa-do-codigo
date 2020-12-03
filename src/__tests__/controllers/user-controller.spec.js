import {buildRes, buildReq, buildUser} from '../../../test/utils/generate'
import * as userDB from '../../app/db/users'
import * as userController from '../../app/controllers/user-controller'

jest.mock('../../app/db/users')

beforeEach(() => {
  jest.clearAllMocks()
})

test('register returns status 200 with user data', async () => {
  const user = buildUser()

  const req = buildReq({body: user})
  const res = buildRes()

  userDB.insert.mockResolvedValueOnce(user)

  await userController.register(req, res)

  expect(userDB.insert).toHaveBeenCalledWith(user)
  expect(userDB.insert).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(user)
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)
})


test('register return 400 if user already exists', async () => {
  const user = buildUser()
  const {email, name} = user

  userDB.query.mockResolvedValueOnce({email, name})

  const req = buildReq({body: user})
  const res = buildRes()

  await userController.register(req, res)

  expect(userDB.query).toHaveBeenCalledWith({email, name})
  expect(userDB.query).toHaveBeenCalledTimes(1)

  expect(userDB.insert).not.toHaveBeenCalled()

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
