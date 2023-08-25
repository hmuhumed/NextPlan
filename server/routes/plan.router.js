const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "plan" ("task", "location", "date_time","comments","user_id") VALUES 
    ($1, $2, $3, $4, $5);`;
   
    pool.query(queryText, [req.body.task, req.body.location, req.body.dateTime,req.body.comments,req.user.id])
        
        .then(results => {
            console.log('in post plan', results.rows);
            res.sendStatus(201);
        }).catch(err => {
            
            console.log("Error in POST /plan.router", err);
        })
})

router.get('/', async (req, res) => {
    try {
        console.log('in fetch upcoming plans', req.body);

        const sqlText = `
        SELECT *
        FROM "plan"
        WHERE user_id = $1
        ORDER BY 
            CASE 
                WHEN "plan"."isComplete" = false THEN 0 
                ELSE 1
            END,
            date_time ASC;
        `;

        const openWeatherKey = process.env.OPEN_WEATHER_KEY;

        const result = await pool.query(sqlText, [req.user.id]);

        await Promise.all(result.rows.map(async (row) => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${row.location}&appid=${openWeatherKey}&units=imperial`);
                row.weather = response.data;
            } catch (error) {
                console.log('error in open weather api', error);
            }
        }));

        console.log('upcoming plans:', result.rows);
        res.send(result.rows);
    } catch (error) {
        console.log('error fetching plans', error);
        res.sendStatus(500);
    }
});


router.put('/:id', (req, res) => {
    console.log('in updateTask router', req.params.id);
    // Extracting the parameter from the request to update a specific plan item
    const idToUpdate = req.params.id;
    // Constructing an SQL query to update the "isComplete" field of a plan item
    // where the user_id matches the parameterized value ($1).
    const queryText = `
    UPDATE "plan" 
    SET "isComplete" = NOT "isComplete"
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