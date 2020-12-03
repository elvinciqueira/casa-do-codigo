import * as stateDB from '../db/states'

async function createState(req, res) {
  const { name, country_id } = req.body
  
  const existingState = await stateDB.query({name})

  if (existingState) {
    return res.status(400).json({ error: 'State already exists'})
  }

  const state = await stateDB.insert({ name, country_id })

  return res.status(200).json(state)
}

export { createState }