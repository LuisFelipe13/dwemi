const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

const usersSchema = mongoose.Schema({
  "name": String,
  "email": {
    type: String,
    unique: true,
    lowercase: true
  },
  "password": String,
  "groups": [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Groups'
  }]
})

// On Save Hook, encrypt password
// Before saving a model, run this function
usersSchema.pre('save', function (next) {
  // get access to the user model
  const user = this

  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err) }

      // overwrite plain text password with encrypted password
      user.password = hash
      next()
    })
  })
})
const Users = mongoose.model('Users', usersSchema)
module.exports = Users


module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err
    callback(null, isMatch)
  })
}
