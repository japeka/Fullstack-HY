const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { Blog, Bloguser } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: Bloguser,
      attributes: ["name"],
    },
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await Bloguser.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
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
