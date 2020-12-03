import {buildReq, buildRes, buildState} from '../../../test/utils/generate'
import * as stateDB from '../../app/db/states'
import * as stateController from '../../app/controllers/state-controller'

jest.mock('../../app/db/states')

beforeEach(() => jest.clearAllMocks())

test('return 200 with req.state', async () => {
  const state = buildState()

  stateDB.insert.mockResolvedValueOnce(state)

  const req = buildReq({body: state})
  const res = buildRes()

  await stateController.createState(req, res)

  expect(stateDB.insert).toHaveBeenCalledWith(state)
  expect(stateDB.insert).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(state)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('return 400 state already exists', async () => {
  const state = buildState()
  const {name} = state

  stateDB.query.mockResolvedValueOnce({name})

  const req = buildReq({body: state})
  const res = buildRes()

  await stateController.createState(req, res)

  expect(stateDB.query).toHaveBeenCalledWith({name})
  expect(stateDB.query).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "State already exists",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})
