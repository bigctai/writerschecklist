const Journal = require("../models/journal.model.js");
// Create and Save a new journal
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a Journal
      const journal = new Journal({
        journal_name: req.body.journal_name,
        word_count: req.body.word_count || null,
        minimum_age: req.body.minimum_age || null,
        maximum_age: req.body.maximum_age || null,
        deadline: req.body.deadline || null
      });
      // Save journal in the database
      Journal.create(journal, (err, data) => {
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
    const word_count = req.query.word_count;
    const range = req.query.range;
    const status = req.query.status;
    console.log(status)
    Journal.getAll(word_count, range, status, (err, data) => {
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
    Journal.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found journal with id ${req.params.id}.`
            });
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
      Journal.updateById(
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
// Delete a journal with the specified id in the request
exports.delete = (req, res) => {
    Journal.remove(req.params.id, (err, data) => {
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
exports.deleteAll = (req, res) => {
    Journal.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all journals."
          });
        else res.send({ message: `All journals were deleted successfully!` });
      });
};