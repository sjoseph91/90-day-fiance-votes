const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue")
const Comment = require("../models/comment");

//get all issues
issueRouter.get("/", (req, res, next ) => {
    Issue.find((err, issues) => {
        if (err){
            res.status(500);
            return next(err);
        }
        issues.sort((a,b) => b.likes -a. likes)
        return res.status(200).send(issues);
    })
})



//increment issue Likes
issueRouter.put("/:issueId", (req, res, next) => {
    const issueId = req.params.issueId;
    const incrementAmount = req.body.incAmount;
    Issue.findOneAndUpdate(
        {_id: issueId},
        {$inc: {likes: incrementAmount}},
        {new: true},
        (err, issue) => {
            if (err){
                res.status(500);
                return next(err);
            }
            return res.status(200).send(issue.likes +"")
        }
    )
})


//get issues by user id
issueRouter.get("/userissues", (req, res, next) => {
    Issue.find({user: req.user._id}, (err, issues) => {
        if (err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(issues);
    })
})
//get all comments
issueRouter.get("/comment", (req, res, next ) => {
    Comment.find((err, comments) => {
        if (err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(comments);
    })
})
// get comments by issueId
issueRouter.get("/comment/:issueId", (req, res, next ) => {
    Comment.find({issue: req.params.issueId},(err, comments) => {
        if (err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(comments);
    })
})
issueRouter.post("/comment", (req, res, next) => {
    req.body.user = req.user._id;
    req.body.authorName = req.user.username;

    const newComment = new Comment(req.body);
    newComment.save((err, savedComment) => {
        if (err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedComment)
    } )
})

issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
        if (err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedIssue);
    })
})

module.exports = issueRouter