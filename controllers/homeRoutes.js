const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get;
// get route for all posts
// ----for the homepage handlebar view

// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in -->

//WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

router.get;
// get route for posts but the logged in version?

// WHEN I am signed in to the site
// THEN I see navigation links for the homepage, the dashboard, and the option to log out

module.exports = router;
