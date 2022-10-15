const router = require("express").Router();

const { Bloguser, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await Bloguser.findAll({
    include: {
      model: Blog,
    },
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
  const user = await Bloguser.findByPk(req.params.id);
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
