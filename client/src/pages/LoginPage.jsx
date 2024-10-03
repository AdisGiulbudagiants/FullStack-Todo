import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { loginUser, selectIsLoading } from "../redux/slices/authSlice"
import Input from "../components/Input"
import Button from "../components/Button"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(loginUser({ email, password })).then((res) => {
        if (res.payload) {
          const id = res.meta.requestId
          const token = res.payload.accessToken
          localStorage.setItem("token", token)
          navigate(`/home/${id}`)
        }
      })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-300 to-cyan-300">
      <div className="w-[420px] border p-5 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-5 text-4xl text-center">Sign In</h1>
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
            text={isLoading ? "Loading..." : "Log In"}
          />
        </form>
        <p>
          Dont Have An Account Yet? Just{" "}
          <NavLink className="font-poppins-semiBold" to="/register">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
