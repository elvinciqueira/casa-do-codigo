import Discount from '../models/discount'

async function insert(discount) {
  const result = await Discount.create(discount)

  return result
}

async function query(queryObj) {
  const result = await Discount.findOne({where:queryObj})

  return result
}

async function drop() {
  await Discount.drop()
}

export {
  insert,
  query,
  drop
}