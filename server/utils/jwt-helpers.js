const jwt = require("jsonwebtoken")

function jwtTokens({ id, name, email }) {
  const user = { id, name, email }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  })
  return { accessToken, refreshToken }
}

module.exports = { jwtTokens }
