const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "plan" ("task", "comments", "user_id") VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.task, req.body.comments, req.user.id])
    .then(results => {
        res.sendStatus(201);
    }).catch(err => {
        console.log("Error in POST /plan.router", err);
    })
})

module.exports = router;