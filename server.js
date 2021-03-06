const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4200;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connection established");
});

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// delete once string generated
// console.log(require('crypto').randomBytes(64).toString('hex'))