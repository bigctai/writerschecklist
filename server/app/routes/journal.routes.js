module.exports = app => {
    const journals = require("../controllers/journal.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", journals.create);
    // Retrieve all journals
    router.get("/", journals.findAll);
    // Retrieve all published journals
    //router.get("/published", journals.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", journals.findOne);
    // Update a Tutorial with id
    router.put("/:id", journals.update);
    // Delete a Tutorial with id
    router.delete("/:id", journals.delete);
    // Delete all journals
    router.delete("/", journals.deleteAll);
    app.use('/api/journals', router);
  };