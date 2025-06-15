"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditMealDialog } from "@/components/edit-meal-dialog"
import { Clock, Edit, Save, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const initialTimetableData = {
  Monday: {
    breakfast: {
      time: "7:30 AM - 9:00 AM",
      menu: ["Idli", "Sambar", "Chutney", "Tea", "Banana"],
    },
    lunch: {
      time: "12:30 PM - 2:00 PM",
      menu: ["Rice", "Dal", "Chapati", "Mixed Veg Curry", "Curd", "Salad"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Samosa", "Tea"],
    },
    dinner: {
      time: "7:30 PM - 9:00 PM",
      menu: ["Jeera Rice", "Rajma", "Chapati", "Cabbage Sabzi", "Papad"],
    },
  },
  Tuesday: {
    breakfast: {
      time: "7:30 AM - 9:00 AM",
      menu: ["Poha", "Boiled Egg", "Tea", "Fruit"],
    },
    lunch: {
      time: "12:30 PM - 2:00 PM",
      menu: ["Rice", "Sambar", "Chapati", "Beans Poriyal", "Curd", "Pickle"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Bread Pakora", "Lemon Tea"],
    },
    dinner: {
      time: "7:30 PM - 9:00 PM",
      menu: ["Plain Rice", "Chicken Curry", "Chapati", "Carrot Sabzi", "Sweet"],
    },
  },
  Wednesday: {
    breakfast: {
      time: "7:30 AM - 9:00 AM",
      menu: ["Upma", "Coconut Chutney", "Tea", "Banana"],
    },
    lunch: {
      time: "12:30 PM - 2:00 PM",
      menu: ["Rice", "Chole", "Chapati", "Pumpkin Curry", "Buttermilk"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Biscuits", "Milk"],
    },
    dinner: {
      time: "7:30 PM - 9:00 PM",
      menu: ["Fried Rice", "Gobi Manchurian", "Salad", "Ice Cream"],
    },
  },
  Thursday: {
    breakfast: {
      time: "7:30 AM - 9:00 AM",
      menu: ["Dosa", "Sambar", "Chutney", "Tea"],
    },
    lunch: {
      time: "12:30 PM - 2:00 PM",
      menu: ["Rice", "Dal", "Chapati", "Aloo Gobi", "Raita"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Banana Chips", "Tea"],
    },
    dinner: {
      time: "7:30 PM - 9:00 PM",
      menu: ["Khichdi", "Papad", "Curd", "Pickle"],
    },
  },
  Friday: {
    breakfast: {
      time: "7:30 AM - 9:00 AM",
      menu: ["Paratha", "Curd", "Pickle", "Tea"],
    },
    lunch: {
      time: "12:30 PM - 2:00 PM",
      menu: ["Pulao", "Chana Masala", "Chapati", "Salad", "Kheer"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Bhel Puri", "Lemon Tea"],
    },
    dinner: {
      time: "7:30 PM - 9:00 PM",
      menu: ["Rice", "Paneer Butter Masala", "Chapati", "Sweet Corn Sabzi"],
    },
  },
  Saturday: {
    breakfast: {
      time: "8:00 AM - 9:30 AM",
      menu: ["Sandwich", "Boiled Egg", "Tea", "Fruit"],
    },
    lunch: {
      time: "1:00 PM - 2:30 PM",
      menu: ["Biryani", "Raita", "Salad", "Sweet"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Veg Cutlet", "Tea"],
    },
    dinner: {
      time: "8:00 PM - 9:00 PM",
      menu: ["Plain Rice", "Mixed Veg Kurma", "Chapati", "Payasam"],
    },
  },
  Sunday: {
    breakfast: {
      time: "8:00 AM - 10:00 AM",
      menu: ["Puri", "Aloo Curry", "Halwa", "Tea"],
    },
    lunch: {
      time: "1:00 PM - 2:30 PM",
      menu: ["Special Thali (Rice, Dal, 2 Curries, Papad, Curd, Sweet)"],
    },
    snacks: {
      time: "5:00 PM - 5:30 PM",
      menu: ["Cake Slice", "Hot Chocolate"],
    },
    dinner: {
      time: "8:00 PM - 9:30 PM",
      menu: ["Veg Noodles", "Spring Roll", "Fruit Salad"],
    },
  },
}

type MealType = "breakfast" | "lunch" | "snacks" | "dinner"
type DayType = keyof typeof initialTimetableData

export default function HostelMessTimetable() {
  const [timetableData, setTimetableData] = useState(initialTimetableData)
  const [editingMeal, setEditingMeal] = useState<{ day: DayType; meal: MealType } | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("hostel-mess-timetable")
    if (savedData) {
      try {
        setTimetableData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  const saveToLocalStorage = () => {
    localStorage.setItem("hostel-mess-timetable", JSON.stringify(timetableData))
    setHasChanges(false)
    toast({
      title: "Changes Saved",
      description: "Your timetable has been saved locally.",
    })
  }

  const handleMealUpdate = (day: DayType, meal: MealType, updatedMeal: { time: string; menu: string[] }) => {
    setTimetableData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: updatedMeal,
      },
    }))
    setHasChanges(true)
    setEditingMeal(null)
  }

  const getCurrentMeal = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }) as DayType

    if (currentHour >= 7 && currentHour < 11) return { day: currentDay, meal: "breakfast" as MealType }
    if (currentHour >= 12 && currentHour < 15) return { day: currentDay, meal: "lunch" as MealType }
    if (currentHour >= 17 && currentHour < 18) return { day: currentDay, meal: "snacks" as MealType }
    if (currentHour >= 19 && currentHour < 22) return { day: currentDay, meal: "dinner" as MealType }

    return null
  }

  const currentMeal = getCurrentMeal()

  const days = Object.keys(timetableData) as DayType[]
  const meals: MealType[] = ["breakfast", "lunch", "snacks", "dinner"]

  const MealCard = ({ day, meal }: { day: DayType; meal: MealType }) => {
    const mealData = timetableData[day][meal]
    const isCurrentMeal = currentMeal?.day === day && currentMeal?.meal === meal

    return (
      <Card className={`relative ${isCurrentMeal ? "ring-2 ring-green-500 bg-green-50" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium capitalize flex items-center gap-2">
              {meal}
              {isCurrentMeal && (
                <Badge variant="secondary" className="text-xs">
                  Now
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setEditingMeal({ day, meal })} className="h-8 w-8 p-0">
              <Edit className="h-3 w-3" />
            </Button>
          </div>
          <CardDescription className="text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {mealData.time}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {mealData.menu.map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">House Food Timetable</h1>
            <p className="text-gray-600 mt-1">Weekly meal schedule and menu</p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button onClick={saveToLocalStorage} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            )}
            <Badge variant="outline" className="gap-1">
              <Smartphone className="h-3 w-3" />
              Synced Locally
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium">Day</th>
                    {meals.map((meal) => (
                      <th key={meal} className="text-left p-4 font-medium capitalize min-w-[200px]">
                        {meal}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{day}</td>
                      {meals.map((meal) => {
                        const mealData = timetableData[day][meal]
                        const isCurrentMeal = currentMeal?.day === day && currentMeal?.meal === meal

                        return (
                          <td key={meal} className={`p-4 ${isCurrentMeal ? "bg-green-50" : ""}`}>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {mealData.time}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingMeal({ day, meal })}
                                  className="h-6 w-6 p-0"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {mealData.menu.map((item, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                              {isCurrentMeal && (
                                <Badge variant="secondary" className="text-xs">
                                  Current Meal
                                </Badge>
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="cards" className="mt-6">
            <div className="space-y-6">
              {days.map((day) => (
                <Card key={day}>
                  <CardHeader>
                    <CardTitle className="text-xl">{day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {meals.map((meal) => (
                        <MealCard key={meal} day={day} meal={meal} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {editingMeal && (
          <EditMealDialog
            day={editingMeal.day}
            meal={editingMeal.meal}
            mealData={timetableData[editingMeal.day][editingMeal.meal]}
            onSave={handleMealUpdate}
            onCancel={() => setEditingMeal(null)}
          />
        )}
      </div>
    </div>
  )
}
