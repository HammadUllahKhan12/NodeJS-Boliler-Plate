const jwt = require('jsonwebtoken')
var login = require('../Modal/modal')

const Auth = async (req, res, next) => {
  try {
    console.log('zxcvbnm', req.header('Auth'))
    if (req.header('Auth') === undefined) {
      res
        .json({
          message: 'Token not provided!'
        })
        .status(500)
    } else {
      const token = req.header('Auth').replace('Bearer ', '')
      const user_id = await jwt.verify(token, 'qwertyuiop')

      var result = await login.findOne({ _id: user_id.id })

      if (result !== 'invalid signature') {
        if (result !== null) {
          next()
        } else {
          res
            .json({
              message: 'USer Not Found'
            })
            .status(500)
        }
      } else {
        res
          .json({
            message: 'Invalid Token provided'
          })
          .status(500)
      }
    }
  } catch (error) {
    res.status(500)
    res.json({
      data: error
    })
  }
}

module.exports = Auth
