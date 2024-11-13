const express = require("express");
const app = express();
const cors = require("cors");
const port = 8001;
const db = require("./models");
const articlesRouter = require("./routes/Articles.js");
const commentsRouter = require("./routes/Comments.js");
const usersRouter = require("./routes/Users.js");

app.use(cors());
app.use(express.json());
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Backend running at http://127.0.0.1:${port}`);
  });
});
