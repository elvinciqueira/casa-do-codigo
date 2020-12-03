import * as userDB from '../db/users'

async function register(req, res) {
  const { email, description, name } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name/email cannot be blank' })
  }

  const existingUser = await userDB.query({email, name})

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists'})
  }

  const user = await userDB.insert({ name, email, description })

  return res.status(200).json(user)
}

export {register}