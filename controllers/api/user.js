const router = require("express").Router();
const { User, Post } = require("../../models");

router.get;
// get all posts by user_id
// ----user dashboard handlebars page

// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

router.post;
// post route for adding new blog post
// ----render to new-post handlebars view

// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

router.update("?");

router.delete;
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard

module.exports = router;
