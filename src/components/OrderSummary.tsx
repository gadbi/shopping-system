"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/store"
import { clearCart } from "../store/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle } from "lucide-react"

interface OrderSummaryProps {
  onBack: () => void
}

interface OrderData {
  fullName: string
  address: string
  email: string
  products: Array<{
    name: string
    category: string
    quantity: number
  }>
}

export default function OrderSummary({ onBack }: OrderSummaryProps) {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootState) => state.cart)

  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitOrder = async () => {
    if (!fullName.trim() || !address.trim() || !email.trim()) {
      alert("אנא מלא את כל השדות הנדרשים")
      return
    }

    if (!email.includes("@")) {
      alert("אנא הזן כתובת אימייל תקינה")
      return
    }

    setIsSubmitting(true)

    const orderData: OrderData = {
      fullName: fullName.trim(),
      address: address.trim(),
      email: email.trim(),
      products: items.map((item) => ({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
      })),
    }

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit order")
      }

      setIsSubmitted(true)
      dispatch(clearCart())
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("שגיאה בשליחת ההזמנה. אנא נסה שוב.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6" dir="rtl">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">ההזמנה נשלחה בהצלחה!</h2>
            <p className="text-gray-600 mb-6">תודה על ההזמנה. נחזור אליך בהקדם.</p>
            <Button onClick={onBack}>חזור לרשימת הקניות</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowRight className="h-4 w-4" />
          חזור
        </Button>
        <h1 className="text-2xl font-bold">סיכום ההזמנה</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>פרטי ההזמנה</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">שם פרטי ומשפחה *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="הזן שם מלא"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">כתובת מלאה *</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="הזן כתובת מלאה"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">כתובת אימייל *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="הזן כתובת אימייל"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>סיכום המוצרים</span>
              <Badge variant="secondary">{getTotalItems()} פריטים</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                  <Badge variant="outline">כמות: {item.quantity}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleSubmitOrder} className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "שולח הזמנה..." : "אשר הזמנה"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
