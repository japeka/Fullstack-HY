require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_ONYX_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

const main = async () => {
  const blogs = await Blog.findAll();
  const newBlogs = blogs.map((blog) => blog.dataValues);
  newBlogs.forEach((n) => {
    console.log(`${n.author} ${n.title} ${n.likes} likes`);
  });
};
main();
