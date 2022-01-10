const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new Pool({
  user: process.env.USER,
  database: process.env.DATABASE,
  port: 5430,
  password: process.env.PASS,
});
pool.on("connect", () => {
  console.log("connected to the db");
});

const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        name VARCHAR(128),
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const queryText = "DROP TABLE IF EXISTS users returning *";
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTwitTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      twits(
        id UUID PRIMARY KEY,
        twit VARCHAR(128),
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTwitTable = () => {
  const queryText = "DROP TABLE IF EXISTS twits returning *";
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const createLikeTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      likes(
        twit_id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        FOREIGN KEY (twit_id) REFERENCES twits (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropLikeTable = () => {
  const queryText = "DROP TABLE IF EXISTS likes returning *";
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const createCommentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      comments(
        twit_id UUID NOT NULL,
        user_id UUID NOT NULL,
        comment VARCHAR(128),
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (twit_id) REFERENCES twits (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropCommentTable = () => {
  const queryText = "DROP TABLE IF EXISTS comments returning *";
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
  createTwitTable();
  createLikeTable();
  createCommentTable();
};
const dropAllTables = () => {
  dropUserTable();
  dropTwitTable();
  dropLikeTable();
  dropCommentTable();
};
pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});
module.exports = {
  createUserTable,
  createAllTables,
  dropUserTable,
  dropAllTables,
  createTwitTable,
  dropTwitTable,
  createLikeTable,
  dropLikeTable,
  createCommentTable,
  dropCommentTable,
};
require("make-runnable");
