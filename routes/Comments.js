const express = require("express");
const commentsRouter = express.Router();
const { Comments } = require("../models");

commentsRouter.get("/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  const allComments = await Comments.findAll({
    where: { ArticleId: articleId },
    order: [["id", "desc"]],
  }); //* SELECT * FROM comments WHERE ArticleId = articleId ORDER BY id DESC;
  res.json({
    message: "Get all comments on article id: ",
    id: articleId,
    data: allComments,
  });
});

commentsRouter.post("/", async (req, res) => {
  const newComment = req.body;
  await Comments.create(newComment); //* INSERT INTO comments VALUES()
  res.json({ message: "Successfully created comment", data: newComment });
});

module.exports = commentsRouter;
