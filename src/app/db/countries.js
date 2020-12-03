import Country from '../models/country'
import State from '../models/state'

async function insert(country) {
  const result = await Country.create(country)

  return result
}

async function readById(id) {
  const result = await Country.findByPk(id, {
    include: [
      {
        model: State,
        as: 'state',
        attributes: ['name']
      }
    ]
  })

  return result
}

async function find() {
  const result = await Country.findAll({ 
    include: [
      {
        model: State,
        as: 'state',
        attributes: ['name']
      }
    ]
  })

  return result
}

async function query(queryObj) {
  const result = await Country.findOne({where:queryObj})

  return result
}

async function drop() {
  await Country.drop()
}

export {
  insert,
  query,
  drop,
  find,
  readById
}