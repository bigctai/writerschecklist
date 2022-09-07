const UserJournal = require("../models/checklist.model.js");
// Create and Save a new journal
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a Journal
      const user_journal = new UserJournal({
        user_id: req.body.user_id,
        journal_id: req.body.journal_id
      });
      // Save journal in the database
      UserJournal.add(user_journal, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the journal."
          });
        else res.send(data);
      });
};
// Retrieve all journals from the database (with condition).
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    UserJournal.getAll(user_id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving journals."
        });
      else res.send(data);
    });
};
// Find a single journal with a id
exports.findOne = (req, res) => {
    UserJournal.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.send(data)
          } else {
            res.status(500).send({
              message: "Error retrieving journal with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};
// find all minimum_age journals
/*
exports.findAllminimum_age = (req, res) => {
    Journal.getAllminimum_age((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving journals."
        });
        else res.send(data);
    });
};
*/
// Update a journal identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      console.log(req.body);
      UserJournal.updateById(
        req.params.user_id, req.params.journal_id,
        req.body,
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
// Delete a journal with the specified id in the request
exports.deleteForUser = (req, res) => {
    UserJournal.removeForUser(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Journal with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Journal with id " + req.params.id
            });
          }
        } else res.send({ message: `Journal was deleted successfully!` });
      });
};
// Delete all journals from the database.
exports.deleteSingleJournal = (req, res) => {
  console.log(req.params)
    UserJournal.removeSingleJournal(req.params.id, req.params.journal_id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all journals."
          });
        else res.send({ message: `All journals were deleted successfully!` });
      });
};