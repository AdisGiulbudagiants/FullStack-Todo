const express = require("express")
const pool = require("../db/db.js")
const { authenticateToken } = require("../middleware/authorization.js")

const router = express.Router()

//Получение всех todos
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const todos = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      user_id,
    ])
    res.status(200).json(todos.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//Добавление todo
router.post("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { title = "Title", description = "Description" } = req.body
    await pool.query(
      "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3)",
      [title, description, user_id]
    )
    res.status(200).json({ message: "Successfully added" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// #######################################
//Редактирование todo
router.put("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { id, title, description } = req.body
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
// #######################################

//Удаление todo
router.delete("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { id } = req.body

    //Находим todo
    const findTodo = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1",
      [user_id]
    )
    //Проверка наличия todo, если его нет выскакивает ошибка 404
    if (!findTodo.rows.length === 0)
      return res.status(404).json({ error: "Todo Not Found" })

    //Удаление самого todo
    await pool.query("DELETE FROM todos WHERE user_id = $1 AND id = $2", [
      user_id,
      id,
    ])
    res.status(200).json({ message: "Todo Deleted Successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
