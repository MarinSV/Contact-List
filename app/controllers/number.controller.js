const db = require("../models");


const Number = db.Number;
const Contact = db.Contact;

module.exports = {
  list(req, res) {
    return Number
      .findAll({
        include: [{
          model: Contact,
          as: 'contact'
        }],
      })
      .then((numbers) => res.status(200).send(numbers))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Number
      .findById(req.params.id, {
        include: [{
          model: Contact,
          as: 'contact'
        }],
      })
      .then((number) => {
        if (!number) {
          return res.status(404).send({
            message: 'Number Not Found',
          });
        }
        return res.status(200).send(number);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Number
      .create({
        contactId: req.body.contactId,
        contactNumber: req.body.contactNumber,
      })
      .then((Number) => res.status(201).send(number))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Number
      .findById(req.params.id, {
        include: [{
          model: Contact,
          as: 'contact'
        }],
      })
      .then(number => {
        if (!number) {
          return res.status(404).send({
            message: 'Number Not Found',
          });
        }
        return Number
          .update({
            contactNumber: req.body.Number_name || Contact.contactNumber
          })
          .then(() => res.status(200).send(Number))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Number
      .findById(req.params.id)
      .then(number => {
        if (!number) {
          return res.status(400).send({
            message: 'Number Not Found',
          });
        }
        return Number
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};