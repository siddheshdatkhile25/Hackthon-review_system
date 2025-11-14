const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

//registration
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

//user login
router.post('/login', (req, res) => {
    const { email, password } = req.body
    const sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [email], async (error, data) => {
        if (data != '') {
            const dbUser = data[0]
            console.log(dbUser)
            const userValid = await bcrypt.compare(password, dbUser.password)
            if (userValid) {
                // body part inside the jwt that needs to be encrypted
                const payload = {
                    uid: dbUser.uid
                }
                // create the jwt token
                const token = jwt.sign(payload, config.secret)
                const user = {
                    token: token,
                    firstName: dbUser.first_name,
                    lastName: dbUser.last_name,
                    email: dbUser.email,
                    
                }
                res.send(result.createResult(error, user))
            }
            else
                res.send(result.createResult('Invalid Password'))
        }
        else
            res.send(result.createResult('Invalid Email'))
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id = ?`
    pool.query(sql, [id], (error, data) => res.send(result.createResult(error, data)))
})


module.exports = router;
