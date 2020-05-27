const router = require('express').Router()
const { Garden, User } = require('../models')

// GET all gardens
router.get('/gardens', (req, res) => {
  Garden.find()
    .then(gardens => res.json(gardens))
    .catch(e => console.error(e)
    )
})

// Get all Garden by USER
router.get('/userplants/:userid', (req, res) => {
  User.findById(req.params.userid).populate('gardens')
    .then(user => {
      res.json(user)
    })
    .catch(e => console.error(e))
})


//POST a garden
router.post('/gardens', (req, res) => {
  Garden.create(req.body)
    .then(response => {
      User.findByIdAndUpdate(req.body.userId, { $push: { gardens: response._id } })
        .then(newGarden => res.json(newGarden))
        .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
})

//PUT a garden
router.put('/gardens/:id', (req, res) => {
  Garden.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e)
    )
})

//Delete a garden
router.delete('/gardens/:id', (req, res) => {
  Garden.findByIdAndDelete(req.params.id)
    .then(({ _id, owner }) => {
      User.findByIdAndUpdate
        (owner, { $pull: { items: _id } })
        .then(() => res.sendStatus(200))
    })
    .catch(e => console.error(e)
    )
})

module.exports = router
