import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { setError } from "./notificationSlice.js"

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      )

      if (response.data.error) {
        thunkAPI.dispatch(setError(response.data.error))
        return thunkAPI.rejectWithValue(response.data.error)
      }

      return response.data
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  userData: null,
  isLoading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = action.payload
      })
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const selectIsLoading = (state) => state.auth.isLoading

export default authSlice.reducer
