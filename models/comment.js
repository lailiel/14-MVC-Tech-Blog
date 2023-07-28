const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// const User = require("./user");
// const Post = require("./post");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: Date.now
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Post",
            key: "id"
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

module.exports = Comment;
