const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// router.get(/)all?


router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll()
      .then((postData) => {
          res.json(postData);
      });
      // console.log(postData)
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
});

router.post('/', withAuth, async (req, res) => {
  if(req.session){
      try {
          const postData = await Post.create({
              title: req.body.title,
              content: req.body.content,
              user_id: req.session.user_id
          })
          .then((postData) => {
              res.json(postData)
          });
          } catch (err) {
              console.log(err);
              res.status(500).json(err);
            }}
            else{
              res.redirect('/login')
            }
  });

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
    console.log(post);
    res.render("post", {
      layout: "main",
      ...post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
