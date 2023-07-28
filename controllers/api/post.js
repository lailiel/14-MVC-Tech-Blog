const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


// router.get("")


router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
          {
          model: Comment,
          attributes: ["id", "content", "post_id", "user_id", "post_date"],
          include: {
            model: User,
            attributes: ["name"],
          }
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    console.log(post)
    res.render('post', { 
      layout: 'main',
      ...post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get route for individual posts (by id)
// ---- render route for post handlebar view
// ^^ done

// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post 
// ^^ done


// and have the option to leave a comment



module.exports = router;
