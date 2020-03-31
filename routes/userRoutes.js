const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Login Route - Creates a session
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) throw err
    res.json({
      isLoggedIn: !!user,
      user: user.username,
      token: jwt.sign({ id: user._id }, 'garden')
    })
  })
})

// Registration Route
router.post('/users/register', (req, res) => {
  User.register(new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username
  }), req.body.password, err => {
    if (err) throw err 
    res.sendStatus(200)
  })
})

router.put('/users/:id', (req, res) => {
  User.updateOne({ _id: req.params.id }, { $set: { 
    username: req.body.username,
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email
    }}, (err, res) => {
      if(err) throw err
      res.sendStatus(200)
    })
})



module.exports = router