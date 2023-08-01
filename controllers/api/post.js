const router = require("express").Router();
const { User, Post, Comment } = require("../../models/index.js");
const withAuth = require("../../utils/auth");

// ----------------------------------------------------------------------------
// get all post

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll().then((postData) => {
      res.json(postData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----------------------------------------------------------------------------
// create new post

router.get("/new", withAuth, async (req, res) => {
  if (req.session) {
    try {
      res.render("postcreation");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/new", withAuth, async (req, res) => {
  if (req.session) {
    try {
      const postData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      }).then((postData) => {
        res.json(postData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.redirect("/login");
  }
});

// ----------------------------------------------------------------------------
// get post by ID

router.get("/:id", withAuth, async (req, res) => {
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
            attributes: ["id", "name"],
          },
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----------------------------------------------------------------------------
// update post by ID

router.get("/:id/edit", withAuth, async (req, res) => {
  if (req.session) {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    res.render("postedit", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
});

router.put("/:id/edit", withAuth, async (req, res) => {
  if (req.session) {
  try {
    const editPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!editPost) {
      res.status(404).json({ message: "No post found with this ID" });
    }
    res.json({ message: "Post successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }}
});

// ----------------------------------------------------------------------------
// delete post by ID

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No post found with this ID" });
    }

    const commentData = await Comment.destroy({
      where: { post_id: req.params.id },
    });

    res.json({ message: "Post and associated comments successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
