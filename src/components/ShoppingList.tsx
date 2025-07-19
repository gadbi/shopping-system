"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import { addItem, type CartItem } from "../store/cartSlice"
import { fetchCategories } from "../store/categoriesSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"

interface ShoppingListProps {
  onContinueOrder: () => void
}

export default function ShoppingList({ onContinueOrder }: ShoppingListProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading, error } = useSelector((state: RootState) => state.categories)
  const { items } = useSelector((state: RootState) => state.cart)

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [productName, setProductName] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleAddToCart = () => {
    if (!selectedCategory || !productName.trim()) {
      alert("אנא בחר קטגוריה והזן שם מוצר")
      return
    }

    const newItem: CartItem = {
      id: `${selectedCategory}-${productName}-${Date.now()}`,
      name: productName,
      category: selectedCategory,
      quantity: quantity,
    }

    dispatch(addItem(newItem))
    setProductName("")
    setQuantity(1)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  if (loading) return <div className="text-center p-8">טוען קטגוריות...</div>
  if (error) return <div className="text-center p-8 text-red-500">שגיאה: {error}</div>

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            רשימת קניות
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">קטגוריה</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">שם המוצר</Label>
              <Input
                id="product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="הזן שם מוצר"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">כמות</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-end">
              <Button onClick={handleAddToCart} className="w-full">
                הוסף מוצר לסל
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>עגלת הקניות</span>
              <Badge variant="secondary">{getTotalItems()} פריטים</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
            <div className="mt-6 pt-4 border-t">
              <Button onClick={onContinueOrder} className="w-full" size="lg">
                המשך להזמנה
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
