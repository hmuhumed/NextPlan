const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "plan" ("task", "comments") VALUES ($1, $2);`;
})

module.exports = router;