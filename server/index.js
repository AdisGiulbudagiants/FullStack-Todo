require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRoutes = require("./routes/users-routes.js")
const authRoutes = require("./routes/auth-routes.js")
const todosRoutes = require("./routes/todos.js")

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({ credentials: true, origin: `http://localhost:${PORT}` || "*" }))
app.use(cookieParser())

app.use("/api/users", usersRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/todos", todosRoutes)

app.listen(PORT, console.log(`Server is running on port ${PORT}`))
