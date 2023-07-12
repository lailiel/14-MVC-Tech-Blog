const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


router.update("?");
// post route for adding a comment to existing blog post. update by id?
//----render to which handlebars view?

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created