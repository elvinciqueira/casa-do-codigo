import Category from '../models/category'

async function createCategory(req, res) {
  const { name } = req.body

  if (!name) { 
    return res.status(400).json({ error: 'name cannot be blank '})
  }
  
  const existingCategory = await Category.findOne({ where: { name }})


  if (existingCategory) {
    return res.status(400).json({ error: 'Category already exists'})
  }

  const category = await Category.create({ name })

  return res.json(category)
}

export { createCategory }