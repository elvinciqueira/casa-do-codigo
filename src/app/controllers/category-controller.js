import * as categoryDB from '../db/categories' 

async function createCategory(req, res) {
  const { name } = req.body

  if (!name) { 
    return res.status(400).json({ error: 'name cannot be blank '})
  }
  
  const existingCategory = await categoryDB.query({name})

  if (existingCategory) {
    return res.status(400).json({ error: 'Category already exists'})
  }

  const category = await categoryDB.insert({ name })

  return res.status(200).json(category)
}

export { createCategory }