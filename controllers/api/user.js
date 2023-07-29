const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// ----------------------------------------------------------------------------

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// ----------------------------------------------------------------------------

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ----------------------------------------------------------------------------
// dashboard of logged in user

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbDashboardData = await Post.findAll({
      where: {user_id: req.session.user_id},
      attributes: ["id", "title", "content", "post_date"],
    });
    const dashboard = dbDashboardData.map((post) => post.get({ plain: true }));
    console.log(dashboard)
    res.render("dashboard", { 
      layout: "main",
      dashboard });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----------------------------------------------------------------------------
// profile

router.get("/:id", async (req, res) => {
  try {
    const dbProfileData = await Post.findAll({
      where: {user_id: req.params.id},
      include: {
          model: User,
          attributes: ["name"],
    },
    });
    const profile = dbProfileData.map((post) => post.get({ plain: true }));
    res.render("profile", { 
      layout: "main",
      profile });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// get all posts by user_id
// ----user dashboard handlebars page

// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

// router.post;
// post route for adding new blog post
// ----render to new-post handlebars view

// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

// router.update("?");

// router.delete;
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard

module.exports = router;
