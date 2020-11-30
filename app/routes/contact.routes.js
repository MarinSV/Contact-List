module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Contact
    router.post("/", contacts.create);
  
    // Retrieve all Contacts
    router.get("/", contacts.findAll);
  
    // Retrieve all published Contacts
    //router.get("/published", contacts.findAllPublished);
  
    // Retrieve a single Contacts with id
    router.get("/:id", contacts.findOne);
  
    // Update a Contact with id
    router.put("/:id", contacts.update);
  
    // Delete a Contact with id
    router.delete("/:id", contacts.delete);
  
    // Delete all Contacts
    router.delete("/", contacts.deleteAll);
  
    app.use("/api/contacts", router);
  };