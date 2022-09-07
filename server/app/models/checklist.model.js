const sql = require("./db.js");
// constructor
const UserJournal = function(journal) {
  this.user_id = journal.user_id;
  this.journal_id = journal.journal_id;
};
UserJournal.add = (newJournal, result) => {
  sql.query("INSERT INTO users_journals SET ?", newJournal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created journal: ", { ...newJournal });
    result(null, {...newJournal });
  });
};
UserJournal.findById = (id, result) => {
  sql.query(`SELECT j.id, journal_name, genre, deadline, submitted, \
  heard_back FROM users_journals uj JOIN users u ON uj.user_id = u.id \
  JOIN journals j ON uj.journal_id = j.id WHERE uj.user_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found journal: ", res);
      result(null, res);
      return;
    }
    // not found Journal with the id
    result({ kind: "not_found" }, null);
  });
};
UserJournal.getAll = (user_id, result) => {
  let query = "SELECT journal_name, genre, deadline, submitted, \
  heard_back FROM users_journals uj JOIN users u ON uj.user_id = u.id \
  JOIN journals j ON uj.journal_id = j.id";
  if (user_id) {
    query += ` WHERE user_id = ${user_id}`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user's journals: ", res);
    result(null, res);
  });
};
/*
Journal.getAllPublished = result => {
  sql.query("SELECT * FROM journals WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("journals: ", res);
    result(null, res);
  });
};
*/
UserJournal.updateById = (user_id, journal_id, journal, result) => {
  sql.query(
    "UPDATE users_journals SET submitted = ?, heard_back = ? WHERE user_id = ? AND journal_id = ?",
    [journal.submitted, journal.heard_back, user_id, journal_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Journal with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated journal: ", { user_id: user_id, journal_id: journal_id, submitted: journal.submitted, heard_back: journal.heard_back});
      result(null, { user_id: user_id, journal_id: journal_id, submitted: journal.submitted, heard_back: journal.heard_back});
    }
  );
};
UserJournal.removeForUser = (id, result) => {
  sql.query("DELETE FROM users_journals WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Journal with the id
      console.log("not found")
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user_journal with id: ", id);
    result(null, res);
  });
};
UserJournal.removeSingleJournal = (id, journal_id, result) => {
  sql.query(`DELETE FROM users_journals WHERE journal_id = ${journal_id} AND user_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} user_journals`);
    result(null, res);
  });
};
module.exports = UserJournal;