const { User } = require("../models");

const userData = [
  {
    name: "bob83",
    email: "bobsemail@email.com",
    password: "Bobspw1",
  },
  {
    name: "sarah45",
    email: "sarahsemail@email.com",
    password: "Sarahspw1",
  },
  {
    name: "phil45",
    email: "philsemail@email.com",
    password: "Philspw1",
  },
  {
    name: "SagetheDog",
    email: "sagesemail@email.com",
    password: "sagespw1",
  },
];

const seedUser = async () => {
  await User.bulkCreate(userData, {
    individualHooks:true
  });
};

module.exports = seedUser;
