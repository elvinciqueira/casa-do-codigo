import {buildReq, buildRes, buildCountry} from '../../../test/utils/generate'
import * as countryDB from '../../app/db/countries'
import * as countryController from '../../app/controllers/country-controller'

jest.mock('../../app/db/countries')

beforeEach(() => jest.clearAllMocks())

test('return 200 with req.country', async () => {
  const country = buildCountry()

  countryDB.insert.mockResolvedValueOnce(country)

  const req = buildReq({body: country})
  const res = buildRes()

  await countryController.createCountry(req, res)

  expect(countryDB.insert).toHaveBeenCalledWith(country)
  expect(countryDB.insert).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith(country)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('return 400 name cant be blank', async () => {
  const req = buildReq()
  const res = buildRes()

  await countryController.createCountry(req, res)

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

test('return 400 country already exists', async () => {
  const country = buildCountry()
  const {name} = country

  countryDB.query.mockResolvedValueOnce({name})

  const req = buildReq({body: country})
  const res = buildRes()

  await countryController.createCountry(req, res)

  expect(countryDB.query).toHaveBeenCalledWith({name})
  expect(countryDB.query).toHaveBeenCalledTimes(1)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "Country already exists",
      },
    ]
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})
