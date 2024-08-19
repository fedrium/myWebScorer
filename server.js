const express = require("express");
const mongoose = require("mongoose");
const scoreController = require("./controller/scoreController")
const { render } = require("ejs");

const dbURI = "mongodb+srv://fedrium:mongodbpass123@node.y5rel.mongodb.net/score-db";
mongoose.connect(dbURI)
    .then((result) => app.listen(3000));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", scoreController.score_index);
app.get("/score", scoreController.score_index);
app.get("/score/:id", scoreController.score_detail);
app.get("/search", scoreController.score_search);
app.delete("/score/:id", scoreController.score_delete);
app.post("/score", scoreController.score_create);

app.get("/create", (req, res) => {
    res.render("create");
});

app.use((req, res) => {
    res.status(404).render("404");
})