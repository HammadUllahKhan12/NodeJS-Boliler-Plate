var Schema = require('../Modal/modal')

exports.SignUp = (data, token) => {
  var schema = new Schema()

  schema.password = data.password
  schema.email = data.email
  schema.token = token

  return schema
}

