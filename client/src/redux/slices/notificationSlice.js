import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setError: (state, action) => {
      return action.payload
    },
    clearError: () => {
      return null
    },
  },
})

export const { setError, clearError } = notificationSlice.actions

export const selectErrorMessage = (state) => state.notification

export default notificationSlice.reducer
