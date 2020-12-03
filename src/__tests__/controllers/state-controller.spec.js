import {buildReq, buildRes, buildState} from '../../../test/utils/generate'
import State from '../../app/models/state'
import * as stateController from '../../app/controllers/state-controller'

jest.mock('../../app/models/state')

beforeEach(() => jest.clearAllMocks())

test('return 200 with req.state', async () => {
  const state = buildState()

  State.create.mockResolvedValueOnce(state)

  const req = buildReq({body: state})
  const res = buildRes()

  await stateController.createState(req, res)

  expect(State.create).toHaveBeenCalledWith(state)
  expect(State.create).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(state)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('return 400 name cant be blank', async () => {
  const req = buildReq()
  const res = buildRes()

  await stateController.createState(req, res)

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

test('return 400 country_id cant be blank', async () => {
  const state = buildState()

  delete state.country_id

  const req = buildReq({body: state})
  const res = buildRes()

  await stateController.createState(req, res)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "country cannot be blank",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('return 400 state already exists', async () => {
  const state = buildState()
  const {name} = state

  State.findOne.mockResolvedValueOnce({where: {name}})

  const req = buildReq({body: state})
  const res = buildRes()

  await stateController.createState(req, res)

  expect(State.findOne).toHaveBeenCalledWith({where: {name}})
  expect(State.findOne).toHaveBeenCalledTimes(1)

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
