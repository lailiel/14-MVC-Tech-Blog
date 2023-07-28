const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth')



router.post('/', withAuth, async (req, res) => {
        try {
            const commentData = await Comment.create({
                content: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            .then(res.json(commentData));
            console.log(commentData)
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
              }
    });


// router.post("?");
// post route for adding a comment to existing blog post. update by id?
//----render to which handlebars view?

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

module.exports = router;