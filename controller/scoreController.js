const Score = require("../models/models");

const score_index = (req, res) => {
    Score.find()
        .then(result => {
            res.render("score", { scores: result });
        })
        .catch(err => {
            console.log(err);
        })
}

const score_detail = (req, res) => {
    const UID = req.params.id;

    Score.findById(UID)
        .then((result) => {
            res.render("detail", { temp: result });
        })
        .catch((err) => {
            console.log(err);
        })
}

const score_search = (req, res) => {
    const { projectName, score, description } = req.query;


    let query = {};
    if (projectName) query.projectName = { $regex: projectName };
    if (score) query.score = score;
    if (description) query.description = { $regex: description };
    Score.find(query).exec()
        .then(result => res.render("score", { scores: result }))
        .catch(err => console.log(err));
}

const score_delete = (req, res) => {
    const UID = req.params.id;

    Score.findByIdAndDelete(UID)
        .then(result => {
            res.json({ redirect: "/score"});
        })
}

const score_create = (req, res) => {
    const score = new Score(req.body);

    score.save()
        .then(result => {
            res.redirect("./score");
        })
        .catch((err) => {
            console.log(err);
        })
}

const score_update = (req, res) => {
    console.log(req.body);

    const filter = { projectName: req.body.projectName };
    const update = { score: req.body.score, description: req.body.description };
    Score.findOneAndUpdate(filter, update)
        .then(result => {
            Score.find()
                .then(result => {
                        res.render("score", { scores: result });
                })
        })
}

module.exports = {
    score_index,
    score_detail,
    score_search,
    score_delete,
    score_create,
    score_update
}