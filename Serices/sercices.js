var login = require('../Modal/modal')
var User = require('../Mapper/Mapper')

exports.signUp = async data => {
  try {
    var NewUSer = new login()
    NewUSer.email = data.body.email
    NewUSer.password = data.body.password

    const token = await NewUSer.generateAuthToken()

    const newDaTa = await NewUSer.save()
    return Promise.resolve(await User.SignUp(newDaTa, token))
  } catch (error) {
    return false
  }
}

exports.Login = async data => {
  try {
    var result = await login.findOne({ email: data.body.email })

    if (result !== null) {
      var passwordResult = await result.comparePassword(data.body.password)

      if (passwordResult) {
        const token = await result.generateAuthToken()

        return token
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    console.log('error', error)
  }
}
