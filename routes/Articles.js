const express = require("express");
const articlesRouter = express.Router();
const { Articles, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

articlesRouter.get("/", validateToken, async (req, res) => {
  const allArticles = await Articles.findAll({
    include: [Likes],
    order: [["id", "desc"]],
  }); //* SELECT * FROM articles;
  const likedArticle = await Likes.findAll({ where: { UserId: req.user.id } }); //* SELECT * FROM likes WHERE UserId = id;

  res.json({
    message: "Get all articles",
    data: allArticles,
    likedArticle: likedArticle,
  });
});

articlesRouter.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Articles.findOne({
    include: [Likes],
    where: { id: id },
  }); //* SELECT * FROM articles WHERE id = id

  res.json({
    message: "Get article by id: ",
    id: id,
    data: article,
  });
});

articlesRouter.post("/", async (req, res) => {
  const newArticle = req.body;
  await Articles.create(newArticle); //* INSERT INTO articles VALUES()
  res.json({ message: "Successfully created article", data: newArticle });
});

module.exports = articlesRouter;
