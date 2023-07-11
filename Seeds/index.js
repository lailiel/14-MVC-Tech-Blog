const sequelize = require("../config/connection");

const seedUser = require("./seedUser");
const seedPost = require("./seedPost");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUser();
  console.log("\n----- USERS SEEDED -----\n");
  await seedPost();
  console.log("\n----- POSTS SEED -----\n");
};

seedAll();
