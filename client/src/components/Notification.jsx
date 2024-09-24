import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Flip, toast, ToastContainer } from "react-toastify"
import {
  selectErrorMessage,
  clearError,
} from "../redux/slices/notificationSlice.js"
import "react-toastify/dist/ReactToastify.css"

const Notification = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(selectErrorMessage)

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      transition={Flip}
      limit={10}
    />
  )
}

export default Notification
