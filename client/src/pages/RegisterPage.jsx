import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { selectIsLoading, registerUser } from "../redux/slices/authSlice"
import Input from "../components/Input"
import Button from "../components/Button"

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
          <Input
            onChange={(e) => setEmail(e.target.value)}
            icon={<FaUserAlt />}
            placeholder={"email"}
            type={"email"}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            icon={<FaLock />}
            placeholder={"password"}
            type={"password"}
          />
          <Button
            disabled={isLoading}
            type="submit"
            text={isLoading ? "Loading..." : "Create Account"}
          />
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
