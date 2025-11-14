const express = require('express');


//userdefined modules
const pool = require('../utils/db');
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router();

router.get('/', (req, res) => {
    const sql = `SELECT * FROM movies`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/:id', (req, res) => {
    const movie_id = req.params.id;
    const sql = `DELETE FROM movies WHERE movie_id = ?`
    pool.query(sql, [movie_id], (error, data) => res.send(result.createResult(error, data)))
})


module.exports = router;
