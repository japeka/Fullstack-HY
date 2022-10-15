const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { Blog } = require("../models");
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
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
  });
  res.json(blogs);
});

module.exports = router;
