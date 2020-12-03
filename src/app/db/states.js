import State from '../models/state'

async function insert(state) {
  const result = await State.create(state)

  return result
}

async function query(queryObj) {
  const result = await State.findOne({ where: queryObj })

  return result
}
async function drop() {
  await State.drop()
}

export {
  insert,
  query,
  drop
}