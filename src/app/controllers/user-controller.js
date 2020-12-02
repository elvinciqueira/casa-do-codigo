import User from '../models/user';

async function register(req, res) {
  const { email, description, name } = req.body;

  const existingUser = await User.findOne({ where: { email }})

  if (!name || !email) {
    return res.status(400).json({ message: 'name/email cannot be blank' })
  }

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists'})
  }

  const user = await User.create({ name, email, description })

  return res.status(200).json(user)
}

export {register}