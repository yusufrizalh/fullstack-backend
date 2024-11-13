const express = require("express");
const articlesRouter = express.Router();
const { Articles } = require("../models");

articlesRouter.get("/", async (req, res) => {
  const allArticles = await Articles.findAll({
    order: [["id", "desc"]],
  }); //* SELECT * FROM articles;
  res.json({ message: "Get all articles", data: allArticles });
});

articlesRouter.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Articles.findByPk(id); //* SELECT * FROM articles WHERE id =
  res.json({ message: "Get article by id: ", id: id, data: article });
});

articlesRouter.post("/", async (req, res) => {
  const newArticle = req.body;
  await Articles.create(newArticle); //* INSERT INTO articles VALUES()
  res.json({ message: "Successfully created article", data: newArticle });
});

module.exports = articlesRouter;
