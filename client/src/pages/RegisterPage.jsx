import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { selectIsLoading, registerUser } from "../redux/slices/authSlice"

const RegisterPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const action = await dispatch(registerUser({ email, password }))

    //Перенаправление на страницу LoginPage.jsx для входа в аккаунт
    if (registerUser.fulfilled.match(action)) navigate("/login")
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-300 to-cyan-300">
      <div className="w-[420px] border p-5 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-5 text-4xl text-center">Sign Up</h1>
          <div className="flex justify-center items-center gap-1 mb-2 font-poppins-light">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 rounded-lg border bg-transparent outline-none"
              type="email"
              placeholder="email"
              required
            />
            <FaUserAlt />
          </div>
          <div className="flex justify-center items-center gap-1 font-poppins-light">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 rounded-lg border bg-transparent outline-none"
              type="password"
              placeholder="password"
              required
            />
            <FaLock />
          </div>
          <button
            disabled={isLoading}
            className="flex mx-auto mt-2 p-3 border-2"
            type="submit">
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </form>
        <p>
          Already Have An Account? Just{" "}
          <NavLink className="font-poppins-semiBold" to="/login">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
