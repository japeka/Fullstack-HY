const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ReadingLists extends Model {}

ReadingLists.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bloguserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogusers", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    read: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "readingLists",
  }
);

module.exports = ReadingLists;
