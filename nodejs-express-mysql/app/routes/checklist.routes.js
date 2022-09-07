module.exports = app => {
    const checklist = require("../controllers/checklist.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", checklist.create);
    // Retrieve all journals
    router.get("/", checklist.findAll);
    // Retrieve all published journals
    //router.get("/published", journals.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", checklist.findOne);
    // Update a Tutorial with id
    router.put("/:user_id/:journal_id", checklist.update);
    // Delete a Tutorial with id
    router.delete("/:id", checklist.deleteForUser);
    // Delete all journals
    router.delete("/:id/:journal_id", checklist.deleteSingleJournal);
    app.use('/api/checklist', router);
  };