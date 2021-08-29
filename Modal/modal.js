var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator')

var Loginschema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
})
Loginschema.plugin(uniqueValidator)

Loginschema.methods.generateAuthToken = function () {
  const user = this
  const token = jwt.sign({ id: user._id }, 'qwertyuiop')
  return token
}

Loginschema.methods.comparePassword = async function (GivenPassword) {
  var result = await bcrypt.compare(GivenPassword, this.password)
  if (result) {
    return true
  } else {
    return false
  }
}

Loginschema.pre('save', async function (next) {
  if (this.password.length >= 6) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
  }
})

var login = (module.exports = mongoose.model('signIn', Loginschema))
module.exports.get = (callback, limit) => {
  login.find(callback).limit(limit)
}
