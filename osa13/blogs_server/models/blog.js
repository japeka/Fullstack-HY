const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

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
    // bloguserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: { model: "blogusers", key: "id" },
    // },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1991,
        max: 2022,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    modelName: "blog",
  }
);
module.exports = Blog;
