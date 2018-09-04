var mongoose = require('mongoose')
var connectionString = 'mongodb://user:password1@ds245082.mlab.com:45082/kanban'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})