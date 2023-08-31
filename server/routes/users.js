const bcrypt = require("bcrypt");
const { query } = require("express");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function isEmailValid(email) {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

// Register new user
router.post("/register", function (req, res, next) {
  // retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Input incomplete - email and password needed",
    });
    return;
  }
  // Check email format
  if(!isEmailValid(email)){
    res.status(400).json({
      error: true,
      message: "Please enter a valid email format",
    });
    return;
  }

  // Determine if user already exists
  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", email);
  queryUsers
    .then((users) => {
      if (users.length > 0) {
        throw new Error("User already exists");
      }
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      return req.db.from("users").insert({ email, hash });
    })
    .then(() => {
      res.status(201).json({ success: true, message: "User created" });
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: err.message });
    });
});

router.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Backend data", email, password);
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Input incomplete - email and password needed",
    });
    return;
  }

  if(!isEmailValid(email)){
    res.status(400).json({
      error: true,
      message: "Please enter a valid email format",
    });
    return;
  }

  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", email);

  queryUsers
    .then((users) => {
      if (users.length === 0) {
        throw new Error("User does not exist");
      }

      const user = users[0];
      return bcrypt.compare(password, user.hash);
    })
    .then((match) => {
      if (!match) {
        throw new Error("Passwords do not match");
      }

      const secretKey = "secret key";
      const expires_in = 60 * 60 * 24;

      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ email, exp }, secretKey);
      res.json({ token_type: "Bearer", token, expires_in });
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: err.message });
    });
});

// Add team list for user
router.post("/update/team", async function (req, res) {
  const email = req.body.email;
  const team = req.body.team;
  if (!email) {
    throw new Error("Email is required");
  }
  const filter = {
    email: email,
  };
  const oldTeamListQuery = req.db
    .from("users")
    .select("team_list")
    .where(filter);
  const oldTeamList = await oldTeamListQuery.then((list) => list[0].team_list);
  console.log("old list", oldTeamList, "type: ", typeof oldTeamList);
  let newTeamlist = [];
  if (oldTeamList !== null) {
    console.log("a");
    if (!oldTeamList.includes(team)) {
      oldTeamList.push(team);
      console.log(oldTeamList);
    }
    newTeamlist = oldTeamList.slice();
  } else {
    console.log("b");
    newTeamlist.push(team);
  }
  console.log("new list", newTeamlist);
  const updateVal = {
    team_list: JSON.stringify(newTeamlist),
  };
  req.db
    .from("users")
    .where(filter)
    .update(updateVal)
    .then(() => {
      res.status(201).json({ Message: "Successful update" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: true, message: err.message });
    });
});

// Delete team for user
router.post("/delete/team", async function (req, res) {
  const email = req.body.email;
  const team = req.body.team;
  if (!email) {
    throw new Error("Email is required");
  }
  const filter = {
    email: email,
  };
  const oldTeamListQuery = req.db
    .from("users")
    .select("team_list")
    .where(filter);
  const oldTeamList = await oldTeamListQuery.then((list) => list[0].team_list);
  let newTeamlist = [];

  if (oldTeamList !== null) {
    if (!oldTeamList.includes(team)) {
      newTeamlist = oldTeamList.slice();
    }
    newTeamlist = arrayRemove(oldTeamList, team);
  }

  const updateVal = {
    team_list: JSON.stringify(newTeamlist),
  };
  req.db
    .from("users")
    .where(filter)
    .update(updateVal)
    .then(() => {
      res.status(201).json({ Message: "Successful update" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: true, message: err.message });
    });
});

// get the team list based on user's email
router.get("/team/:email", function (req, res) {
  const email = req.params.email;
  const filter = {
    email: email,
  };
  req.db
    .from("users")
    .where(filter)
    .select("team_list")
    .then((teams) => {
      res.status(200).json({ teams });
    });
});
module.exports = router;
