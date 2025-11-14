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
        return res.json({ message: 'Missing required fields' });
    }
    if (!validateEmail(email)) {
        return res.json({ message: 'Invalid email format' });
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
                    userid:dbUser.id
                    
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

//change password
router.put('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    const sqlSelect = `SELECT * FROM users WHERE email = ?`
    pool.query(sqlSelect, [email], async (error, data) => {
        if (error) {
            return res.send(result.createResult(error))
        }
        if (data.length === 0) {
            return res.send(result.createResult('User not found'))
        }
        const dbUser = data[0]
        const isOldPasswordValid = await bcrypt.compare(oldPassword, dbUser.password)
        if (!isOldPasswordValid) {
            return res.send(result.createResult('Invalid old password'))
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, config.saltRounds)
        const sqlUpdate = `UPDATE users SET password = ? WHERE email = ?`
        pool.query(sqlUpdate, [hashedNewPassword, email], (error, data) => {
            res.send(result.createResult(error, data))
        })
    })
})

module.exports = router;
