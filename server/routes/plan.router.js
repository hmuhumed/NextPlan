const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "plan" ("task", "location", "date_time","comments","user_id") VALUES 
    ($1, $2, $3, $4, $5);`;
   
    pool.query(queryText, [req.body.task, req.body.location, req.body.dateTime,req.body.comments,req.user.id])
        
        .then(results => {
            res.sendStatus(201);
        }).catch(err => {
            
            console.log("Error in POST /plan.router", err);
        })
})

router.get('/', (req, res) => {
    console.log('in fetch upcoming plans', req.body);
    // Constructing an SQL query to retrieve all rows from the "plan" table
    // where the user_id matches the parameterized value ($1).
    const sqlText = `
    SELECT *
    FROM "plan"
    WHERE user_id = $1;
    `;
    // Executing an SQL query to retrieve all rows from the "plan" table
    // where the user_id matches the authenticated user's ID.
    pool.query(sqlText, [req.user.id])
        // Handling the query result using a Promise chain
        .then((result) => {
            // Logging the retrieved rows for debugging and informational purposes
            console.log('upcoming plans:', result.rows)
            // Sending the retrieved rows as the response to the client
            res.send(result.rows)
        })
        // If an error occurs during query execution, it is caught here
        .catch((error) => {
            // Responding with an error status and message
            // (You can customize the error message and status as needed)
            console.log('error fetching plans', error)
            res.sendStatus(500)
        })
});

router.put('/:id', (req, res) => {
    console.log('in updateTask router', req.params.id);
    // Extracting the parameter from the request to update a specific plan item
    const idToUpdate = req.params.id;
    // Constructing an SQL query to update the "isComplete" field of a plan item
    // where the user_id matches the parameterized value ($1).
    const queryText = `
    UPDATE "plan" 
    SET "isComplete" = TRUE
    WHERE "plan".id = $1 AND "plan".user_id = $2;`;
    // Executing the SQL query to update the "isComplete" field of a plan item
    // based on the provided item ID.
    pool.query(queryText, [parseInt(req.params.id), req.user.id])
        .then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log("Error in PUT /plan.router", err);
        })
})

router.delete('/:id', (req, res) => {
    console.log('in deleteTask router', req.params.id);
    // Extracting the parameter from the request to delete a specific plan item
    const idToDelete = req.params.id;

    const queryText = `DELETE FROM "plan" WHERE "plan".id = $1 AND "plan".user_id = $2;`;
    // Executing the SQL query to delete a plan item based on the provided item ID.
    pool.query(queryText, [parseInt(req.params.id), req.user.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log("Error in DELETE /plan.router", err);
        })
})

module.exports = router;