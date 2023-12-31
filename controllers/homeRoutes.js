const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require('../utils/auth')

router.get("/", async (req, res) => {
  try {
    const dbHomepageData = await Post.findAll({
      include: {
        model: User,
        attributes: ["name"],
      }
    });
    const homepage = dbHomepageData.map((post) => post.get({ plain: true })).reverse();
    res.render('homepage', { 
      layout: "main",
      homepage,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('api/user/dashboard');
    return
  }
  res.render('login'), {layout: 'main'};
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('api/user/dashboard');
    return
  }
  res.render('signup'), {layout: 'main'};
});



module.exports = router;
