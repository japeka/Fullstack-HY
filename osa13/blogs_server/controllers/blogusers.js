const router = require("express").Router();
const { Op } = require("sequelize");
const { Bloguser, Blog, ReadingLists } = require("../models");

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.name) {
    where.name = {
      [Op.substring]: req.query.name,
    };
  }

  const users = await Bloguser.findAll({
    include: {
      model: Blog,
    },
    where,
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    if (
      req.body.username &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.username)
    ) {
      const user = await Bloguser.create(req.body);
      return res.json(user);
    } else {
      return res
        .status(400)
        .json({ error: "Validation isEmail on username failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const user = await Bloguser.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ["bloguserId", "createdAt", "updatedAt"] },
        through: {
          attributes: [],
        },
        include: {
          model: ReadingLists,
          attributes: ["read", "id"],
        },
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const bloguser = await Bloguser.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (bloguser) {
    const userId = bloguser.dataValues.id;
    const blogUser = await Bloguser.findByPk(userId);
    if (blogUser) {
      blogUser.username = req.body.username;
      await blogUser.save();
      return res.json(blogUser);
    }
  }
  return res.status(404).end();
});

module.exports = router;
