const express = require('express')
const router = express.Router()

const credentials = {
    email: 'admin@gmail.com',
    password: 'abc123'
}

router.post('/login', (req, res) => {
    if(req.body.email == credentials.email && req.body.password == credentials.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
        //res.end('Login Successful!')
    } else {
        res.end('Invalid Username')
    }
})

router.get('/dashboard', (req, res) => {
    if(req.session.user) {
        res.render('dashboard', {user: req.session.user})
    }else {
        res.send('Unauthorized User')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if(err) {
            res.send('Error')
        }else {
            res.render('base', {title: 'Express', logout: 'Logout Successfully...'})
        }
    })
})

module.exports = router