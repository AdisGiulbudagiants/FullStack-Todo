const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("../db/db.js")
const { authenticateToken } = require("../middleware/authorization.js")
const { jwtTokens } = require("../utils/jwt-helpers.js")

const router = express.Router()

//Регистрация пользователя
router.post("/register", async (req, res) => {
  try {
    //Деструктуризируем введенные пользователем данные
    const { email, password } = req.body
    //Проверяем существует ли уже пользователь с такой почтой
    const existUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    )
    console.log(existUser.rows.length)
    if (existUser.rows.length >= 1)
      return res.json({ error: "Your email is already registered" })

    //Хешируем пароль для дальнейшего добавления в БД
    const hashedPassword = await bcrypt.hash(password, 10)
    //Добавляем пользователя в БД
    const newUser = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *`,
      [email, hashedPassword]
    )
    //Отправляем ответ от сервера
    res.status(201).json(newUser.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//Редактирование имени пользователя
router.put("/edit", authenticateToken, async (req, res) => {
  try {
    const { id, name } = req.body
    //Проверка наличия пользователя в БД
    const existUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ])
    if (existUser.rows.length === 0)
      return res.status(404).json({ error: "User Not Found" })

    //Изменение имени пользователя
    const editUserName = await pool.query(
      "UPDATE users SET name = COALESCE($1, name) WHERE id = $2 RETURNING *",
      [name, id]
    )
    res.json(editUserName.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

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
