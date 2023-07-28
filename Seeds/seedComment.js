const { Comment } = require("../models");

const commentData = [
  {
    content: "This is testing comment on post 1",
    post_id: 1,
    user_id: 3,
  },
  {
    content: "This is testing comment on post 2",
    post_id: 2,
    user_id: 3,
  },
  {
    content: "This is testing comment on post 3",
    post_id: 3,
    user_id: 2,
  },
  {
    content: "This is testing comment on post 4",
    post_id: 4,
    user_id: 1,
  },
];

const seedComment = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComment;
