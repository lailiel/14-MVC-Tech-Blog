const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

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

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/dashboard/:id", async (req, res) => {
  try {
    const dbDashboardData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ["id", "content"],
        },
      ],
    });
    const dashboard = dbDashboardData.get({ plain: true });
    res.render("dashboard", { dashboard });
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
