const express = require('express');
const bcrypt = require('bcrypt');

//userdefined modules
const pool = require('../utils/db');
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router();


const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

router.get('/', (req, res) => {
    const sql = `SELECT * FROM users`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, mobile, birth } = req.body;
    const sql = `INSERT INTO users (first_name, last_name, email, password, mobile, birth)
                VALUES (?, ?, ?, ?, ?, ?)`

    //basic validations
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const hashpassword = await bcrypt.hash(password, config.saltRounds)
        pool.query(sql, [firstName, lastName, email, hashpassword, mobile || null, birth || null], (error, data) => {
            res.send(result.createResult(error, data))
        })
    }
    catch (error) {
        res.send(result.createResult(error))
    }
})


// POST /api/v1/users/login (Sign In)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }

    try {
        // Retrieve user from the database
        const query = 'SELECT id, password FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
        // Compare the submitted password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // In a real application, you would generate a JWT token here and send it back
        res.status(200).json({ 
            message: 'Login successful', 
            userId: user.id,
            token: 'fake-jwt-token-12345'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});


// Add routes for Edit Profile, Change Password, Logout, etc. similarly

module.exports = router;
