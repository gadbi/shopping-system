"use client"

import { useState } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"
import ShoppingList from "./components/ShoppingList"
import OrderSummary from "./components/OrderSummary"

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<"shopping" | "summary">("shopping")

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === "shopping" ? (
        <ShoppingList onContinueOrder={() => setCurrentScreen("summary")} />
      ) : (
        <OrderSummary onBack={() => setCurrentScreen("shopping")} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
