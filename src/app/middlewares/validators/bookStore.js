import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      brief: Yup.string().required().max(500),
      user_id: Yup.number().required(),
      category_id: Yup.number().required(),
      isbn: Yup.string().required(),
      pages: Yup.string().required(),
      price: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou.', messages: error.inner });
  }
};