import * as Yup from 'yup';

import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      telefone: Yup.number()
        .integer()
        .positive()
        .required(),
      rua: Yup.string().required(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientsExists = await Recipients.findOne({
      where: { telefone: req.body.telefone },
    });

    if (recipientsExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const recipients = await Recipients.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      telefone: Yup.number()
        .integer()
        .positive()
        .required(),
      rua: Yup.string().required(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { telefone } = req.body;

    const recipient = await Recipients.findByPk(req.params.id);

    if (telefone && telefone !== recipient.telefone) {
      const recipientsExists = await Recipients.findOne({
        where: { telefone: req.body.telefone },
      });

      if (recipientsExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const recipientUpdate = await recipient.update(req.body);

    return res.json(recipientUpdate);
  }
}

export default new RecipientsController();
