const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth')

// ----------------------------------------------------------------------------
// get all comments

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll()
        .then((commentData) => {
            res.json(commentData);
        });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
});

// ----------------------------------------------------------------------------
// post new comment

router.post('/', async (req, res) => {
    if(req.session){
        try {
            const commentData = await Comment.create({
                content: req.body.content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            .then((commentData) => {
                res.json(commentData)
            });
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
              }}
              else{
                res.redirect('/login')
              }
    });


module.exports = router;