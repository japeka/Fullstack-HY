const express = require("express");
const app = express();
require("express-async-errors");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const blogUsersRouter = require("./controllers/blogusers");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/blogusers", blogUsersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "SequelizeValidationError") {
    return response
      .status(400)
      .send({ error: "year given not within range: 1991-2022" });
  }
  next(error);
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
