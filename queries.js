const Pool = require("pg").Pool;
const pool = new Pool({user: "me", host: "localhost", database: "api", password: "password", port: "5432"});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY ID ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.row);
  });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.row);
  });
};

const createUser = (req, res) => {
  const {name, email} = req.body;

  pool.query("INSERT INTO users(name, email) VALUES ($1 ,$2)", [
    name, email
  ], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(201).send("User added with ID :$result.insertId");
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {name, email} = req.body;

  pool.query("UPDATE users SET name = $1 , email=$2  WHERE id =$3", [
    name, email, id
  ], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).send("User modified with ID :${id}");
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE  FROM users WHERE id=$1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).send("User deleted with ID :${id}");
  });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser
};
