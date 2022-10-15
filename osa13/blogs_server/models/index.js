const Blog = require("./blog");
const Bloguser = require("./bloguser");
Bloguser.hasMany(Blog);
Blog.belongsTo(Bloguser);
Bloguser.sync({ alter: true });
Blog.sync({ alter: true });
module.exports = {
  Blog,
  Bloguser,
};
