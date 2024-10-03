import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
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
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userData
      )

      if (response.data.error) {
        thunkAPI.dispatch(setError(response.data.error))
        return thunkAPI.rejectWithValue(response.data.error)
      }

      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(setError("Invalid email or password"))
      } else {
        thunkAPI.dispatch(setError(error.message))
      }
      thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  userData: null,
  isLoading: false,
  tokens: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Регистрация
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
    //Авторизация
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        state.userData = action.payload
      }
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false
      state.userData = null
    })
  },
})

export const selectIsLoading = (state) => state.auth.isLoading
export const selectUserData = (state) => state.auth.userData

export default authSlice.reducer
