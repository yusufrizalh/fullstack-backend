const express = require("express");
const likesRouter = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware.js");

likesRouter.post("/", validateToken, async (req, res) => {
  const { ArticleId } = req.body;
  const UserId = req.user.id;

  //   await Likes.create({
  //     ArticleId: ArticleId,
  //     UserId: UserId,
  //   });
  //   res.json({ message: "Like article", id: ArticleId, liked: true });

  const user = await Likes.findOne({
    where: { ArticleId: ArticleId, UserId: UserId },
  });

  if (!user) {
    await Likes.create({
      ArticleId: ArticleId,
      UserId: UserId,
    });
    res.json({ message: "Like article", id: ArticleId, liked: true });
  } else {
    await Likes.destroy({ where: { ArticleId: ArticleId, UserId: UserId } });
    res.json({ message: "Unlike article", liked: false });
  }
});

module.exports = likesRouter;
