import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      middleName: Yup.string().required(),
      country_id: Yup.number().required(), 
      email: Yup.string()
        .email()
        .required(),
      cpf_cnpj: Yup.string().required(),
      cellphone: Yup.string().required(),
      city: Yup.string().required(),
      complement: Yup.string().required(),
      cep: Yup.string().required(),
      address: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou.', messages: error.inner });
  }
};