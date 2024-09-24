import { lazy } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx"
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"))
const NotFound = lazy(() => import("./pages/NotFound.jsx"))
const Home = lazy(() => import("./pages/Home.jsx"))
const Notification = lazy(() => import("./components/Notification.jsx"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Notification />
    </BrowserRouter>
  )
}

export default App
