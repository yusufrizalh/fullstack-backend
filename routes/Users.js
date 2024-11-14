const express = require("express");
const usersRouter = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware.js");

usersRouter.get("/auth", validateToken, (req, res) => {
  res.json({ data: req.user });
});

usersRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hashing) => {
    Users.create({
      username: username,
      password: hashing,
    }); //* INSERT INTO users VALUES();
    res.json({
      message: "Successfully registered user: ",
      username,
      data: username,
    });
  });
});

usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({
    where: { username: username },
  });
  if (!user) {
    res.json({ error: "User does not exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong password" });
      } else {
        const accessToken = sign(
          {
            username: user.username,
            id: user.id,
          },
          "importantsecret"
        );
        res.json({
          message: "Successfully login",
          accessToken: accessToken,
          id: user.id,
          username: user.username,
        });
      }
    });
  }
});

module.exports = usersRouter;
