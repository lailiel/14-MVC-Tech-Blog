const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// ----------------------------------------------------------------------------
// create new user

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
// login

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
// logout

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
    res.render("dashboard", { 
      dashboard,
      logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----------------------------------------------------------------------------
// profile of other users

router.get("/:id", withAuth, async (req, res) => {
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
      profile,
      logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
