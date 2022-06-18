const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("../config/db");
const schema = require("./graphql/schemas/schema");
const port = process.env.PORT || 5000;

const main = () => {
  const app = express();
  app.use(cors());
  // connect to mongoDB
  connectDB();
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === "development",
    })
  );

  app.use("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
  });

  app.listen(port, console.log(`Listening on port ${port}`));
};

main();
