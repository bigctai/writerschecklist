const sql = require("./db.js");
// constructor
const Journal = function(journal) {
  this.journal_name = journal.journal_name;
  this.word_count = journal.word_count;
  this.minimum_age = journal.minimum_age;
  this.maximum_age = journal.maximum_age;
  this.deadline = journal.deadline;
};
Journal.create = (newJournal, result) => {
  sql.query("INSERT INTO journals SET ?", newJournal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created journal: ", { id: res.insertId, ...newJournal });
    result(null, { id: res.insertId, ...newJournal });
  });
};
Journal.findById = (id, result) => {
  sql.query(`SELECT * FROM journals WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found journal: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Journal with the id
    result({ kind: "not_found" }, null);
  });
};
Journal.getAll = (word_count, range, status, result) => {
  let query = "SELECT id, journal_name, a.range, genre, word_count, deadline \
  FROM journals j\
  JOIN age a ON j.age_range = a.range_id";
  var stringRange = ""
  if(range>0){
    stringRange = range.toString();
  }
  if (word_count>0) {
    query += ` WHERE word_count < '${parseInt(word_count)}'`;
    if (range>0) {
      query+= ` AND (age_range = ${stringRange.charAt(0)}`
      for(var i = 1; i<stringRange.length; i++){
        console.log(stringRange.charAt(i))
        query+= ` OR age_range = ${stringRange.charAt(i)}`
      }
      query += `)`
    }
    if (status>0) {
      query+= ` AND open = ${parseInt(status)}`
    }
  }
  else if (range>0) {
    query+= ` WHERE (age_range = ${stringRange.charAt(0)}`
    for(var i = 1; i<stringRange.length; i++){
      console.log(stringRange.charAt(i))
      query+= ` OR age_range = ${stringRange.charAt(i)}`
    }
    query+=`)`
    if (status>0) {
      query+= ` AND open = ${parseInt(status)}`
    }
  }
  else if(status>0){
    query+=` WHERE open = ${parseInt(status)}`
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("journals: ", res);
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
Journal.updateById = (id, journal, result) => {
  sql.query(
    "UPDATE journals SET journal_name = ?, word_count = ?, published = ? WHERE id = ?",
    [journal.journal_name, journal.word_count, journal.published, id],
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
      console.log("updated journal: ", { id: id, ...journal });
      result(null, { id: id, ...journal });
    }
  );
};
Journal.remove = (id, result) => {
  sql.query("DELETE FROM journals WHERE id = ?", id, (err, res) => {
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
    console.log("deleted journal with id: ", id);
    result(null, res);
  });
};
Journal.removeAll = result => {
  sql.query("DELETE FROM journals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} journals`);
    result(null, res);
  });
};
module.exports = Journal;