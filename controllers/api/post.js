const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


// router.get("")


router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "user_id"],
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.render('post', { layout: 'main'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get route for individual posts (by id)
// ---- render route for post handlebar view

// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment



module.exports = router;
