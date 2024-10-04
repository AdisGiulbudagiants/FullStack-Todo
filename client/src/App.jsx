import { lazy, Suspense } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
const Loading = lazy(() => import("./components/Loading.jsx"))
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"))
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"))
const NotFound = lazy(() => import("./pages/NotFound.jsx"))
const Home = lazy(() => import("./pages/Home.jsx"))
const Notification = lazy(() => import("./components/Notification.jsx"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route
          path="/home/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Notification />
    </BrowserRouter>
  )
}

export default App
