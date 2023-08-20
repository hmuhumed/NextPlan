const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {

    // Constructing a SQL query to insert a new plan item into the "plan" table.
    // The query includes placeholders ($1, $2, $3) for parameterized values to prevent SQL injection.
    const queryText = `INSERT INTO "plan" ("task", "comments", "user_id") VALUES ($1, $2, $3);`;
    // Executing an SQL query to insert a new plan item into the "plan" table.
    // The query includes parameterized values taken from the request body and the authenticated user's ID.
    pool.query(queryText, [req.body.task, req.body.comments, req.user.id])
    // If the query is successful, respond with a 201 status code.
    .then(results => {
        res.sendStatus(201);
    }).catch(err => {
         // If an error occurs during the query execution, log the error for debugging purposes.
        console.log("Error in POST /plan.router", err);
    })
})

router.get('/', (req, res) => {
    console.log('in fetch upcoming plans',req.body);
    // Constructing an SQL query to retrieve all rows from the "plan" table
    // where the user_id matches the parameterized value ($1).
    const sqlText = `
    SELECT *
    FROM "plan"
    WHERE user_id = $1;
    `;
    // Executing an SQL query to retrieve all rows from the "plan" table
    // where the user_id matches the authenticated user's ID.
    pool.query(sqlText,[req.user.id])
    // Handling the query result using a Promise chain
     .then((result) =>{
        // Logging the retrieved rows for debugging and informational purposes
      console.log('upcoming plans:',result.rows)
      // Sending the retrieved rows as the response to the client
      res.send(result.rows)
     })
     // If an error occurs during query execution, it is caught here
     .catch((error) =>{
        // Responding with an error status and message
        // (You can customize the error message and status as needed)
      console.log('error fetching plans', error)
      res.sendStatus(500)
     })
  });

router.put('/:id', (req, res) => {
    // Extracting the parameter from the request to update a specific plan item
    const idToUpdate = req.params.id;
    // Constructing an SQL query to update the "isComplete" field of a plan item
    // where the user_id matches the parameterized value ($1).
    const queryText = `UPDATE "plan" SET "isComplete" = true WHERE user_id = $1;`; 
    // Executing the SQL query to update the "isComplete" field of a plan item
    // based on the provided item ID.
    pool.query(queryText, [idToUpdate])
    .then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log("Error in PUT /plan.router", err);
    })
})

module.exports = router;