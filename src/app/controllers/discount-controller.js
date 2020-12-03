import * as discountDB from '../db/discounts'

async function registerDiscount(req, res) {
  const { code, percentage, expiration } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Code is invalid'})
  }

  if (!percentage || percentage < 0) {
    return res.status(400).json({ error: 'percetage must be greater than 0'})
  }

  const existingDiscount = await discountDB.query({code})

  if (existingDiscount) {
    return res.status(400).json({ error: 'code in use'})
  }

  const discount = await discountDB.insert({ 
    code, 
    percentage, 
    expiration
  })

  return res.status(200).json(discount)
}

export {
  registerDiscount
}