const sql = require("./db.js");
// constructor
const User = function(user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = user.password;
};
User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Journal with the id
    result({ kind: "not_found" }, null);
  });
};

User.checkUser = (user_email, result) =>{
  sql.query(`SELECT * FROM users WHERE email = '${user_email}'`,
  (err, res)=>{
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0])
      return;
    }
    result(null, null);
  })
}

User.filter = (word_count, result) => {
  let minimum_words = Infinity;
  word_count.foreach(count=>{
    if(parseInt(count)<minimum_words){
      minimum_words = parseInt(count);
    }
  })
  let maximum_words = 0;
  word_count.foreach(count=>{
    if(parseInt(count)>maximum_words){
      maximum_words = parseInt(count);
    }
  })
  sql.query(`SELECT * from journals WHERE word_count > '${minimum_words}' AND word_count < '${maximum_words}'`
  , (err, res) => {
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
}

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET first_name = ?, last_name = ?, password = ? WHERE id = ?",
    [user.user_first_name, user.user_last_name, user.password, id],
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
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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
    console.log("deleted user with id: ", id);
    result(null, res);
  });
};
module.exports = User;