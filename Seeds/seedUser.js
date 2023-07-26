const { User } = require("../models");

const userData = [
  {
    name: "bob83",
    email: "bobsemail@email.com",
    password: "bobspw",
  },
  {
    name: "sarah45",
    email: "sarahsemail@email.com",
    password: "sarahspw",
  },
  {
    name: "phil45",
    email: "philsemail@email.com",
    password: "philspw",
  },
];

const seedUser = async () => {
  await User.bulkCreate(userData, {
    individualHooks:true
  });
};

module.exports = seedUser;
