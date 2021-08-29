var login = require('../Modal/modal')
var Services = require('../Serices/sercices')

exports.getAllContacts = (req, res) => {
  login.get((err, AllUsers) => {
    if (err) {
      res.json({
        status: 'error',
        message: err
      })
    } else {
      res.json({
        status: 'success',
        message: 'Contact retrieved Successfully',
        data: AllUsers
      })
    }
  })
}

exports.SignIn = async (req, res) => {
  try {
    var result = await Services.Login(req)

    if (result !== false) {
      res.json({
        message: 'Sign In successfully!',
        data: result
      })
    } else {
      res.json({
        message: 'Both password/email did not matched!'
      })
    }
  } catch (error) {}
}

exports.Signup = async (req, res) => {
  try {
    var result = await Services.signUp(req)
    if (result !== false) {
      res.json({
        message: 'New User created!',
        data: result
      })
    } else {
      res.json({
        message: 'Email Already Exist!'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.addUser = (req, res) => {
  var NewUSer = new login()
  NewUSer.email = req.body.name
  NewUSer.password = req.body.password

  NewUSer.save(err => {
    if (err) res.json(err)
    res.json({
      message: 'New User created!',
      data: NewUSer
    })
  })
}
exports.findUser = (req, res) => {
  login.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500)
      res.json({
        message: 'not found'
      })
    } else {
      res.json({
        message: 'found User',
        data: data
      })
    }
  })
}
