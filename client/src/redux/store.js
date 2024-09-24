import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./slices/authSlice.js"
import notificationReducer from "./slices/notificationSlice.js"

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    notification: notificationReducer,
  },
})

export default store
