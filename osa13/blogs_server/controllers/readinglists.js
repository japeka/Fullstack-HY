const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { ReadingLists, Bloguser } = require("../models");
const { DATABASE_URL } = require("../util/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

router.get("/", async (req, res) => {
  const readingLists = await ReadingLists.findAll({});
  res.json(readingLists);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const readingList = await ReadingLists.create({
    ...req.body,
  });
  res.json(readingList);
});

router.put("/:id", async (req, res) => {
  const readingList = await ReadingLists.findByPk(req.params.id);
  if (readingList) {
    readingList.read = req.body.read;
    await readingList.save();
    return res.json(readingList);
  }
  res.status(404).end();
});

module.exports = router;
