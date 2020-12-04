import Purchase from '../models/purchase'

async function insert(purchase) {
  const result = await Purchase.create(purchase)

  return result
}

async function query(queryObj) {
  const result = await Purchase.findOne({where:queryObj})

  return result
}

async function drop() {
  await Purchase.drop()
}

export {
  insert,
  query,
  drop
}