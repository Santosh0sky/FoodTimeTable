"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

type MealType = "breakfast" | "lunch" | "snacks" | "dinner"
type DayType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

interface EditMealDialogProps {
  day: DayType
  meal: MealType
  mealData: {
    time: string
    menu: string[]
  }
  onSave: (day: DayType, meal: MealType, updatedMeal: { time: string; menu: string[] }) => void
  onCancel: () => void
}

export function EditMealDialog({ day, meal, mealData, onSave, onCancel }: EditMealDialogProps) {
  const [time, setTime] = useState(mealData.time)
  const [menu, setMenu] = useState([...mealData.menu])
  const [newItem, setNewItem] = useState("")

  const addMenuItem = () => {
    if (newItem.trim() && !menu.includes(newItem.trim())) {
      setMenu([...menu, newItem.trim()])
      setNewItem("")
    }
  }

  const removeMenuItem = (index: number) => {
    setMenu(menu.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave(day, meal, { time, menu })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addMenuItem()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit {meal} - {day}
          </DialogTitle>
          <DialogDescription>Update the timing and menu items for this meal.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="time">Timing</Label>
            <Input
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 7:30 AM - 9:00 AM"
            />
          </div>

          <div className="grid gap-2">
            <Label>Menu Items</Label>
            <div className="flex gap-2">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add menu item"
              />
              <Button onClick={addMenuItem} size="sm" type="button">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {menu.map((item, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {item}
                  <button onClick={() => removeMenuItem(index)} className="ml-1 hover:bg-red-100 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
