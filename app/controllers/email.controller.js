const db = require("../models");

const Email = db.emails;
const Contact = db.contacts;

module.exports = {
  list(req, res) {
    return Email
      .findAll({
        include: [{
          model: Contact,
          as: 'contact'
        }],
      })
      .then((emails) => res.status(200).send(emails))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Email
      .findById(req.params.id, {
        include: [{
          model: Contact,
          as: 'contact'
        }],
      })
      .then((email) => {
        if (!email) {
          return res.status(404).send({
            message: 'Email Not Found',
          });
        }
        return res.status(200).send(email);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Email
      .create({
        email: req.body.email,
      })
      .then((email) => res.status(201).send(email))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Email
      .findById(req.params.id, {
        include: [{
          model: Contact,
          as: 'contact'
        }],
      })
      .then(email => {
        if (!email) {
          return res.status(404).send({
            message: 'Email Not Found',
          });
        }
        return email
          .update({
            email: req.body.email || Contact.email,
          })
          .then(() => res.status(200).send(email))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Email
      .findById(req.params.id)
      .then(email => {
        if (!email) {
          return res.status(400).send({
            message: 'Email Not Found',
          });
        }
        return email
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};