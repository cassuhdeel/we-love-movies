const { PORT = 5000 } = process.env;
const express = require('express')
const cors = require('cors')
const app = require("./app");
const knex = require("./db/connection");
const router = express.Router()

router.get('/', cors(), (req, res) => {
  res.json({ message: 'Hello!' });
})

app.use('/', router);

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
