import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      descricao: Yup.string()
        .required()
        .test(
          'A descrição só pode conter 400 caracteres',
          descricao => descricao.length <= 400
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou.', messages: error.inner });
  }
};