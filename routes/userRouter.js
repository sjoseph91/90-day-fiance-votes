const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

//get User data
userRouter.get("/", (req, res, next) => {
    User.findOne({_id: req.user._id}, (err, user)=> {
        if(err){
            res.status(500);
            return next(err);
        }
        delete user.password;
        return res.status(200).send(user)
    })

})

//update User Upvotes
userRouter.put("/upvote/:issueId", (req, res, next) => {
    const issueId = req.params.issueId;
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {likedIssues : issueId}, $pull: {dislikedIssues: issueId}},
        {new: true},
        (err, updatedUser) => {
            if (err){
                res.status(500);
                return next(err);
            }
            delete updatedUser.password;
            return res.status(200).send("liked issues and disliked issues updated with upvote")
        }
    )
})

//update User Downvotes
userRouter.put("/downvote/:issueId", (req, res, next) => {
    const issueId = req.params.issueId;
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {dislikedIssues : issueId}, $pull: {likedIssues: issueId}},
        {new: true},
        (err, updatedUser) => {
            if (err){
                res.status(500);
                return next(err);
            }
            delete updatedUser.password;
            return res.status(200).send("liked issues and disliked issues updated with downvote");
        }
    )
})


module.exports = userRouter;