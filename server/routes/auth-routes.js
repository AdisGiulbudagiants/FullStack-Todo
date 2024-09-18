const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("../db/db.js")
const { jwtTokens } = require("../utils/jwt-helpers.js")

const router = express.Router()

//Вход в аккаунт
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    //Проверка почты
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    if (users.rows.length === 0)
      return res.status(401).json({ error: "Email Is Incorrect" })

    //Проверка пароля
    const validPassword = await bcrypt.compare(password, users.rows[0].password)
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect Password" })

    //JWT
    let tokens = jwtTokens(users.rows[0])
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true })
    res.json(tokens)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

router.get("/refresh_token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token
    if (refreshToken === null)
      return res.status(401).json({ error: "Null Refresh Token" })
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message })
        let tokens = jwtTokens(user)
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true })
        res.json(tokens)
      }
    )
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

//Выход из аккаунта
router.delete("/refresh_token", async (req, res) => {
  try {
    res.clearCookie("refresh_token")
    return res.status(200).json({ message: "Refresh Token Deleted" })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

module.exports = router
