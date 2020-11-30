const db = require("../models");

const Contact = db.contacts;
//const Email = db.emails;

const Op = db.Sequelize.Op;

// Create and Save a new Contact
exports.create = (req, res) => {
  // Create a Contact
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    adress: req.body.adress
  };


  // Save Contact in the database
  Contact.create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  var condition_firstname = firstname ? { firstname: { [Op.iLike]: `%${firstname}%` } } : null;
  //var condition_lastname = lastname ? { lastname: { [Op.iLike]: `%${lastname}%` } } : null;

  //Contact.findAll({ where: condition_firstname || condition_lastname})
  Contact.findAll({ where: condition_firstname})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id
      });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Contact.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Contacts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts."
      });
    });
};

// find all published Contacts
/*exports.findAllPublished = (req, res) => {
  Contact.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
}; */