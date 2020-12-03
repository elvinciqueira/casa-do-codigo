import User from '../models/user'

async function insert(user) {
  const result = await User.create(user)

  return result
}

async function query(queryObj) {
  const result = await User.findOne({where:queryObj})

  return result
}

async function drop() {
  await User.drop()
}

export {
  insert,
  query,
  drop
}