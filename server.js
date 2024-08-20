const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const scoreController = require("./controller/scoreController")
const { render } = require("ejs");
const Score = require("./models/models");

dotenv.config();

const dbURI = process.env.DBURL;
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
        console.log("Connected to DB");
    })

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

app.get("/update/:projectName", (req, res) => {
    const pN = req.params.projectName;
    res.render("update", { projectName: pN});
})

app.post("/update" , scoreController.score_update);

app.use((req, res) => {
    res.status(404).render("404");
})