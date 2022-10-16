const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { Op } = require("sequelize");
const { SECRET } = require("../util/config");
const { Blog, Bloguser } = require("../models");

const { tokenExtractor } = require("../util/middleware");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  condition = {};
  if (req.query.search) {
    condition = {
      [Op.or]: [
        {
          title: {
            [Op.eq]: req.query.search,
          },
        },
        {
          author: {
            [Op.eq]: req.query.search,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: {
      model: Bloguser,
      attributes: ["name"],
    },
    where: condition,
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await Bloguser.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    bloguserId: user.id,
  });
  res.json(blog);
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  const blog = await Blog.findOne({
    where: {
      bloguserId: req.decodedToken.id,
    },
  });
  if (blog) {
    await blog.destroy();
    return res.status(204).end();
  }
  return res.status(400).json({
    error:
      "User is not authorized to delete the item because of non-owner role related to the item",
  });
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
