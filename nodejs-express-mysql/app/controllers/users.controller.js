const User = require("../models/user.model.js");
// Create and Save a new journal
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a Journal
      const user = new User({
        user_first_name: req.body.first_name || null,
        user_last_name: req.body.last_name || null,
        email: req.body.email,
        password: req.body.password
      });
      // Save journal in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the journal."
          });
        else res.send(data);
      });
};
// Find a single journal with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

exports.checkUser = (req, res) => {
  const email = req.query.email;
  User.checkUser(email, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "Error retrieving users"
        });
      } else {
        res.send(data);
      }
    });
};

// Update a journal identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      console.log(req.body);
      User.updateById(
        req.params.id,
        new journal(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found journal with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating journal with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};