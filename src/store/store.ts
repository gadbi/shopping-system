import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import categoriesReducer from "./categoriesSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
