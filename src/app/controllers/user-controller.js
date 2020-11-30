import User from '../models/user';

async function register(req, res) {
  const { email, description, name } = req.body;

  const userExist = await User.findOne({ where: { email }})

  if (userExist) {
    return res.status(400).json({ error: 'User already exists'})
  }

  const user = await User.create({ name, email, description })

  return res.json(user)
}

export {register}