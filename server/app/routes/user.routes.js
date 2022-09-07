module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", users.create);
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
    router.get("/", users.checkUser);
    // Update a Tutorial with id
    router.put("/:id", users.update);
    // Delete a Tutorial with id

    app.use('/api/users', router);
  };