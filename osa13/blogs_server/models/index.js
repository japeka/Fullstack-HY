const Blog = require("./blog");
const Bloguser = require("./bloguser");
const ReadingLists = require("./readinglists");

Bloguser.hasMany(Blog);
Blog.belongsTo(Bloguser);

Bloguser.belongsToMany(Blog, { through: ReadingLists, as: "markedBlogs" });
Blog.belongsToMany(Bloguser, { through: ReadingLists, as: "usersMarked" });

module.exports = {
  Blog,
  Bloguser,
  ReadingLists,
};
