const { Post } = require("../models");

const postData = [
  {
    title: "bob's burgers'",
    content: "are good",
    user_id: 1,
  },
  {
    title: "bob sucks",
    content: "burgers are bad",
    user_id: 2,
  },
  {
    title: "i like turtles",
    content: "i like turtles",
    user_id: 3,
  },
  {
    title: "and fish",
    content: "i like turtles and fish",
    user_id: 3,
  },
  {
    title: "Woof",
    content: "I'm a very good dog",
    user_id: 4,
  },
];

const seedPost = async () => {
  await Post.bulkCreate(postData);
};

module.exports = seedPost;
