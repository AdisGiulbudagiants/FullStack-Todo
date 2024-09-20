const express = require("express")
const bcrypt = require("bcrypt")
const pool = require("../db/db.js")
const { authenticateToken } = require("../middleware/authorization.js")

const router = express.Router()

router.get("/", authenticateToken, async (req, res) => {
  try {
    //Делаем запрос к серверу на получение пользователей
    const users = await pool.query(`SELECT * FROM users`)
    //Отправляем ответ от сервера
    res.status(200).json(users.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//Регистрация пользователя
router.post("/", async (req, res) => {
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
    res.status(200).json(newUser.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
