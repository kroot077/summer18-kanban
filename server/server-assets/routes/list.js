let router = require('express').Router()
let Lists = require('../models/list')

router.post('/', (req, res, next) => {
    Lists.create(req.body)
      .then(newList => {
        res.send(newList)
      })
      .catch(err => {
        console.log(err)
        next()
      })
  })

router.get('/:boardId', (req, res, next) => {
    Lists.find({boardId: req.params.id})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.put('/:id', (req, res, next) => {
    Lists.findById(req.params.id)
      .then(list => {
        list.update(req.body, (err) => {
          if (err) {
            console.log(err)
            next()
            return
          }
          res.send("Successfully Updated")
        });
      })
      .catch(err => {
        console.log(err)
        next()
      })
  })

  router.delete('/:id', (req, res, next) => {
    Lists.findById(req.params.id)
      .then(list => {
        Lists.findByIdAndRemove(req.params.id)
          .then(data => {
            res.send('DELORTED')
          })
      })
  })

module.exports = router