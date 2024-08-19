const express = require("express");
const mongoose = require("mongoose");
const Score = require("./models/models");
const { render } = require("ejs");

const dbURI = "mongodb+srv://fedrium:mongodbpass123@node.y5rel.mongodb.net/score-db";
mongoose.connect(dbURI)
    .then((result) => app.listen(3000));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    Score.find()
        .then(result => {
            res.render("score", { scores: result });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/score", (req, res) => {
    Score.find()
        .then(result => {
            res.render("score", { scores: result });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/score/:id", (req, res) => {
    const UID = req.params.id;

    Score.findById(UID)
        .then((result) => {
            res.render("detail", { temp: result });
        })
        .catch((err) => {
            console.log(err);
        })
})

app.delete("/score/:id", (req, res) => {
    const UID = req.params.id;

    Score.findByIdAndDelete(UID)
        .then(result => {
            res.json({ redirect: "/score"});
        })
})

app.get("/create", (req, res) => {
    res.render("create");
})

app.post("/score", (req, res) => {
    const score = new Score(req.body);

    score.save()
        .then(result => {
            res.redirect("./score");
        })
        .catch((err) => {
            console.log(err);
        })
})

app.use((req, res) => {
    res.status(404).render("404");
})