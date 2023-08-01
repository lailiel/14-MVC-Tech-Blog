const { Comment } = require("../models");

const commentData = [
  {
    content: "I agree, they are good",
    post_id: 1,
    user_id: 3,
  },
  {
    content: "I disagree with you",
    post_id: 2,
    user_id: 3,
  },
  {
    content: "I also like turtles",
    post_id: 3,
    user_id: 2,
  },
  {
    content: "I also like turtles, but dislike fish",
    post_id: 4,
    user_id: 1,
  },
  {
    content: "Yes you are a very good dog",
    post_id: 5,
    user_id: 1,
  },
];

const seedComment = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComment;
