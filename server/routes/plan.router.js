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

router.get('/', (req, res) => {
    console.log('in fetch upcoming plans',req.body);
    
    const sqlText = `
    SELECT *
    FROM "plan"
    WHERE user_id = $1;
    `;
pool.query(sqlText,[req.user.id])
     .then((result) =>{
      console.log('upcoming plans:',result.rows)
      res.send(result.rows)
      
     })
     .catch((error) =>{
      console.log('error fetching plans', error)
      res.sendStatus(500)
     })
  });

router.put('/:id', (req, res) => {
    const idToUpdate = req.params.id
    const queryText = `UPDATE "plan" SET "isComplete" = true WHERE user_id = $1;`; 
    pool.query(queryText, [idToUpdate])
    .then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log("Error in PUT /plan.router", err);
    })
})

module.exports = router;