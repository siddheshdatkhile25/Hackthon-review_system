const express = require('express');


//userdefined modules
const pool = require('../utils/db');
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router();

//get reviews
router.get('/', (req, res) => {
    const sql = `SELECT * FROM reviews`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})


// post reviews
router.post('/add', (req, res) => {
   
    const { movie_id, review, rating, user_id } = req.body;

    if (!movie_id || !user_id || !rating || !review) {
        return res.send(result.createResult('Missing required review fields', null));
    }

    const sql = `INSERT INTO reviews (movie_id, review, rating, user_id) VALUES (?, ?, ?, ?)`;
    const values = [movie_id, review, rating, user_id];

    pool.query(sql, values, (error, data) => {
        if (error) {
            res.send(result.createResult(error.message, null));
        } else {
           
            res.send(result.createResult(null, {
                message: 'Review created successfully',
                reviewId: data.insertId, 
                affectedRows: data.affectedRows
            }));
        }
    });
});

// Edit review
router.put('/edit/:id', (req, res) => {
    const reviewId = req.params.id;
    const userId = req.body.user_id;  
    const { review, rating } = req.body;

    if (!review || !rating) {
        return res.send(result.createResult('Missing required fields'));
    }

    // Check if review belongs to user
    const sqlCheck = `SELECT * FROM reviews WHERE id = ? AND user_id = ?`;

    pool.query(sqlCheck, [reviewId, userId], (err, rows) => {
        if (rows.length === 0) {
            return res.send(result.createResult('You can edit only your own review'));
        }

        // Update
        const sqlUpdate = `UPDATE reviews SET review = ?, rating = ? WHERE id = ?`;

        pool.query(sqlUpdate, [review, rating, reviewId], (err2, data) => {
            res.send(result.createResult(err2, 'Review updated successfully'));
        });
    });
});


// Share review
router.post('/share', (req, res) => {
    const { review_id, user_id, share_with } = req.body;

    if (!review_id || !user_id || !share_with) {
        return res.send(result.createResult('Missing fields'));
    }

    if (user_id === share_with) {
        return res.send(result.createResult('You cannot share a review with yourself'));
    }


    const sqlCheck = `SELECT * FROM shares WHERE review_id = ? AND user_id = ?`;

    pool.query(sqlCheck, [review_id, share_with], (err, data) => {
        if (data.length > 0) {
            return res.send(result.createResult('Already shared with this user'));
        }

        const sqlInsert = `INSERT INTO shares (review_id, user_id) VALUES (?, ?)`;

        pool.query(sqlInsert, [review_id, share_with], (err2, data2) => {
            res.send(result.createResult(err2, 'Review shared successfully'));
        });
    });
});


router.delete('/delete/:id', (req, res) => {
    const reviewId = req.params.id;
    const { user_id } = req.body;

    if (!user_id) {
        return res.send(result.createResult("Missing user_id"));
    }

   
    const sqlDeleteReview = `DELETE FROM reviews WHERE id = ? AND user_id = ?`;

    pool.query(sqlDeleteReview, [reviewId, user_id], (err, result1) => {
        if (err) {
            return res.send(result.createResult(err));
        }

       
        if (result1.affectedRows === 0) {
            return res.send(result.createResult("You can delete only your own review"));
        }

     
        const sqlDeleteShares = `DELETE FROM shares WHERE review_id = ?`;

        pool.query(sqlDeleteShares, [reviewId], (err2, result2) => {
            return res.send(result.createResult(err2, {
                message: "Review deleted successfully, shares removed",
                deletedReview: result1.affectedRows,
                deletedShares: result2?.affectedRows || 0
            }));
        });
    });
});

module.exports = router;
