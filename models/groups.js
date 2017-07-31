const mongoose = require('mongoose')

const groupsSchema = mongoose.Schema({
  "groupName" : String,
  "funds" : [{
    'fundName': String,
    'image': String,
    'description': String,
    'goal': Number,
    'balance': Number
  }]
})

const Groups = mongoose.model('Groups', groupsSchema)
module.exports = Groups
