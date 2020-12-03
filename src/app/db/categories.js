import Category from '../models/category'

async function insert(category) {
  const result = await Category.create(category)

  return result
}

async function query(queryObj) {
  const result = await Category.findOne({where:queryObj})

  return result
}

async function drop() {
  await Category.drop()
}

export {
  insert,
  query,
  drop
}