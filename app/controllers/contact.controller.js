const db = require("../models");

const Contact = db.contacts;
const Email = db.emails;
const Number = db.numbers;

module.exports = {
  list(req, res) {
    return Contact
      .findAll({
        include: [{
          model: Number,
          as: 'numbers'
        }],
        include: [{
          model: Email,
          as: 'emails'
        }]
      })
      .then((contacts) => res.status(200).send(contacts))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Contact
      .findById(req.params.id, {
        include: [{
          model: Number,
          as: 'numbers'
        }],
        include: [{
          model: Email,
          as: 'emails'
        }]
      })
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact Not Found',
          });
        }
        return res.status(200).send(contact);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Contact
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adress: req.body.adress,
      })
      .then((contact) => res.status(201).send(contact))
      .catch((error) => res.status(400).send(error));
  },

  addWithNumbers(req, res) {
    return Contact
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adress: req.body.adress,
        numbers: req.body.numbers,
      }, {
          include: [{
          model: Number,
          as: 'numbers'
        }]
      })
      .then((contact) => res.status(201).send(contact))
      .catch((error) => res.status(400).send(error));
  },

  addWithEmails(req, res) {
    return Contact
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adress: req.body.adress,
        emails: req.body.emails,
      }, {
          include: [{
          model: Email,
          as: 'emails'
        }]
      })
      .then((contact) => res.status(201).send(contact))
      .catch((error) => res.status(400).send(error));
  },

  addFullContact(req, res) {
    return Contact
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adress: req.body.adress,
        emails: req.body.emails,
      }, 
      {
          include: [{
          model: Number,
          as: 'numbers'
        }]
      },
      {
        include: [{
        model: Email,
        as: 'emails'
      }]
      }
      )
      .then((contact) => res.status(201).send(contact))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    console.log(req.body);
    return Contact
      .findById(req.params.id, {
        include: [{
          model: Number,
          as: 'numbers'
        }],
      },
      {
        include: [{
          model: Email,
          as: 'emails'
        }],
      }
      )
      .then(contact => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact Not Found',
          });
        }
        return contact
          .updateAttributes({
            firstname: req.body.firstname || contact.firstname,
            lastname: req.body.lastname || contact.lastname,
            adress: req.body.adress || contact.adress,
            numbers: req.body.numbers || contact.numbers,
            emails: req.body.emails || contact.emails
          }, {
              include: [{
              model: Number,
              as: 'numbers'
            }]
          },
          {
            include: [{
            model: Email,
            as: 'emails'
          }]
        }
          )
          .then(() => res.status(200).send(contact))
          .catch((error) => {console.log(error);res.status(400).send(error);});
      })
      .catch((error) => {console.log(error);res.status(400).send(error);});
  },

  delete(req, res) {
    return Contact
      .findById(req.params.id)
      .then(contact => {
        if (!contact) {
          return res.status(400).send({
            message: 'Contact Not Found',
          });
        }
        return contact

          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};