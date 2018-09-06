let router = require('express').Router()
let Comments = require('../models/comment')

router.get('/:taskId', (req, res, next) => {
    Comments.find({taskId: req.params.taskId})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
          res.status(400).send(err)
          next()
        })
})

router.post('/', (req, res, next) => {
    Comments.create(req.body)
      .then(newComment => {
        res.send(newComment)
      })
      .catch(err => {
        res.status(400).send(err)
        next()
      })
  })

router.put('/:id', (req, res, next) => {
    Comments.findById(req.params.id)
      .then(comment => {
        comment.update(req.body, (err) => {
          if (err) {
            console.log(err)
            next()
            return
          }
          res.send("Successfully Updated")
        });
      })
      .catch(err => {
        res.status(400).send(err)
        next()
      })
  })

  router.delete('/:id', (req, res, next) => {
    Comments.findById(req.params.id)
      .then(comment => {
        Comments.findByIdAndRemove(req.params.id)
          .then(data => {
            res.send('DELORTED')
          })
      })
      .catch(err => {
        res.status(400).send(err)
        next()
      })
  })

module.exports = router