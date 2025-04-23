"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Filter, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Define the Phone type
type Phone = {
  id: number
  name: string
  brand: string
  price: number
  storage: string
  condition: string
  image: string
}

// Define the CartItem type
type CartItem = {
  phone: Phone
  quantity: number
}

// Sample phone data
const phones: Phone[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    brand: "Apple",
    price: 999,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+13+Pro",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    price: 799,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+S21",
  },
  {
    id: 3,
    name: "Google Pixel 6",
    brand: "Google",
    price: 699,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Pixel+6",
  },
  {
    id: 4,
    name: "iPhone 12",
    brand: "Apple",
    price: 649,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+12",
  },
  {
    id: 5,
    name: "Samsung Galaxy A52",
    brand: "Samsung",
    price: 399,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A52",
  },
  {
    id: 6,
    name: "OnePlus 9",
    brand: "OnePlus",
    price: 729,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=OnePlus+9",
  },
  {
    id: 7,
    name: "iPhone 11",
    brand: "Apple",
    price: 499,
    storage: "128GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+11",
  },
  {
    id: 8,
    name: "Google Pixel 5a",
    brand: "Google",
    price: 449,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Pixel+5a",
  },
  {
    id: 9,
    name: "Samsung Galaxy A73",
    brand: "Samsung",
    price: 499,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A73",
  },
  {
    id: 10,
    name: "Samsung Galaxy A56 5G",
    brand: "Samsung",
    price: 449,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A56+5G",
  },
  {
    id: 11,
    name: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    price: 429,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A55+5G",
  },
  {
    id: 12,
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    price: 399,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A54",
  },
  {
    id: 13,
    name: "Samsung Galaxy A34 5G",
    brand: "Samsung",
    price: 349,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A34+5G",
  },
  {
    id: 14,
    name: "Samsung Galaxy A33 5G",
    brand: "Samsung",
    price: 329,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A33+5G",
  },
  {
    id: 15,
    name: "Samsung Galaxy A26 5G",
    brand: "Samsung",
    price: 279,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A26+5G",
  },
  {
    id: 16,
    name: "Samsung Galaxy A25 5G",
    brand: "Samsung",
    price: 259,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A25+5G",
  },
  {
    id: 17,
    name: "Samsung Galaxy A24",
    brand: "Samsung",
    price: 239,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A24",
  },
  {
    id: 18,
    name: "Samsung Galaxy A15 5G",
    brand: "Samsung",
    price: 219,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A15+5G",
  },
  {
    id: 19,
    name: "Samsung Galaxy A15",
    brand: "Samsung",
    price: 199,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A15",
  },
  {
    id: 20,
    name: "Samsung Galaxy A14",
    brand: "Samsung",
    price: 179,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A14",
  },
  {
    id: 21,
    name: "Samsung Galaxy A06",
    brand: "Samsung",
    price: 149,
    storage: "32GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A06",
  },
  {
    id: 22,
    name: "Samsung Galaxy A05",
    brand: "Samsung",
    price: 129,
    storage: "32GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A05",
  },
  {
    id: 23,
    name: "Samsung Galaxy A04s",
    brand: "Samsung",
    price: 119,
    storage: "32GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+A04s",
  },
  {
    id: 24,
    name: "Samsung Galaxy M55 5G",
    brand: "Samsung",
    price: 379,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M55+5G",
  },
  {
    id: 25,
    name: "Samsung Galaxy M53 5G",
    brand: "Samsung",
    price: 359,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M53+5G",
  },
  {
    id: 26,
    name: "Samsung Galaxy M33 5G",
    brand: "Samsung",
    price: 329,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M33+5G",
  },
  {
    id: 27,
    name: "Samsung Galaxy M51",
    brand: "Samsung",
    price: 349,
    storage: "128GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M51",
  },
  {
    id: 28,
    name: "Samsung Galaxy M31s",
    brand: "Samsung",
    price: 299,
    storage: "128GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M31s",
  },
  {
    id: 29,
    name: "Samsung Galaxy M31",
    brand: "Samsung",
    price: 279,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M31",
  },
  {
    id: 30,
    name: "Samsung Galaxy M21",
    brand: "Samsung",
    price: 249,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M21",
  },
  {
    id: 31,
    name: "Samsung Galaxy M20",
    brand: "Samsung",
    price: 219,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M20",
  },
  {
    id: 32,
    name: "Samsung Galaxy M15 5G",
    brand: "Samsung",
    price: 199,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M15+5G",
  },
  {
    id: 33,
    name: "Samsung Galaxy M14",
    brand: "Samsung",
    price: 179,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M14",
  },
  {
    id: 34,
    name: "Samsung Galaxy M13",
    brand: "Samsung",
    price: 159,
    storage: "64GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Galaxy+M13",
  },
  // Huawei Phones
  {
    id: 35,
    name: "Huawei Mate XT Ultimate",
    brand: "Huawei",
    price: 2999,
    storage: "1TB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+XT+Ultimate",
  },
  {
    id: 36,
    name: "Huawei Mate 70 RS Ultimate",
    brand: "Huawei",
    price: 2499,
    storage: "1TB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70+RS+Ultimate",
  },
  {
    id: 37,
    name: "Huawei Mate 70 Pro+",
    brand: "Huawei",
    price: 1899,
    storage: "512GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70+Pro+",
  },
  {
    id: 38,
    name: "Huawei Mate 70 Pro",
    brand: "Huawei",
    price: 1499,
    storage: "512GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70+Pro",
  },
  {
    id: 39,
    name: "Huawei Mate 70",
    brand: "Huawei",
    price: 1199,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70",
  },
  {
    id: 40,
    name: "Huawei Mate X6",
    brand: "Huawei",
    price: 1899,
    storage: "512GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+X6",
  },
  {
    id: 41,
    name: "Huawei MatePad Pro",
    brand: "Huawei",
    price: 899,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+MatePad+Pro",
  },
  {
    id: 42,
    name: "Huawei Mate 60",
    brand: "Huawei",
    price: 999,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+60",
  },
  {
    id: 43,
    name: "Huawei Mate X5",
    brand: "Huawei",
    price: 1699,
    storage: "512GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+X5",
  },
  {
    id: 44,
    name: "Huawei Mate 50",
    brand: "Huawei",
    price: 799,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+50",
  },
  {
    id: 45,
    name: "Huawei G9 Plus",
    brand: "Huawei",
    price: 499,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+G9+Plus",
  },
  // Honor Phones
  {
    id: 46,
    name: "Honor X7c",
    brand: "Honor",
    price: 299,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Honor+X7c",
  },
  {
    id: 47,
    name: "Honor X6b",
    brand: "Honor",
    price: 249,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Honor+X6b",
  },
  {
    id: 48,
    name: "Honor X9b",
    brand: "Honor",
    price: 349,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Honor+X9b",
  },
  {
    id: 49,
    name: "Honor X8c",
    brand: "Honor",
    price: 299,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=Honor+X8c",
  },
  // Additional iPhones
  {
    id: 50,
    name: "iPhone 6",
    brand: "Apple",
    price: 199,
    storage: "32GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+6",
  },
  {
    id: 51,
    name: "iPhone 7",
    brand: "Apple",
    price: 249,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+7",
  },
  {
    id: 52,
    name: "iPhone 8",
    brand: "Apple",
    price: 299,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+8",
  },
  {
    id: 53,
    name: "iPhone X",
    brand: "Apple",
    price: 399,
    storage: "64GB",
    condition: "Refurbished",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+X",
  },
  // iPhone 11 already exists in the list
  // iPhone 12 already exists in the list
  // iPhone 13 Pro already exists in the list
  {
    id: 54,
    name: "iPhone 14",
    brand: "Apple",
    price: 799,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+14",
  },
  {
    id: 55,
    name: "iPhone 15",
    brand: "Apple",
    price: 899,
    storage: "128GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+15",
  },
  {
    id: 56,
    name: "iPhone 16",
    brand: "Apple",
    price: 1099,
    storage: "256GB",
    condition: "New",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+16",
  },
]

export default function StorePage() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Add these new state variables after the cart state declarations
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedStorage, setSelectedStorage] = useState<string[]>([])
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>(phones)

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.phone.price * item.quantity, 0)

  // Add to cart function
  const addToCart = (phone: Phone) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item.phone.id === phone.id)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { phone, quantity: 1 }]
      }
    })

    // Open the cart drawer when adding an item
    setIsCartOpen(true)
  }

  // Remove from cart function
  const removeFromCart = (phoneId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.phone.id !== phoneId))
  }

  // Update quantity function
  const updateQuantity = (phoneId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCart((prevCart) =>
      prevCart.map((item) => (item.phone.id === phoneId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  // Add this function to handle checkbox changes for filters
  const handleFilterChange = (
    filterType: "brand" | "priceRange" | "condition" | "storage",
    value: string,
    checked: boolean,
  ) => {
    switch (filterType) {
      case "brand":
        setSelectedBrands((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      case "priceRange":
        setSelectedPriceRanges((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      case "condition":
        setSelectedConditions((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
      case "storage":
        setSelectedStorage((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
    }
  }

  // Add this function to apply the filters
  const applyFilters = () => {
    let result = [...phones]

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((phone) => selectedBrands.includes(phone.brand))
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      result = result.filter((phone) => {
        const price = phone.price
        return selectedPriceRanges.some((range) => {
          if (range === "Under $500") return price < 500
          if (range === "$500 - $700") return price >= 500 && price <= 700
          if (range === "$700 - $1000") return price > 700 && price <= 1000
          if (range === "Over $1000") return price > 1000
          return false
        })
      })
    }

    // Filter by condition
    if (selectedConditions.length > 0) {
      result = result.filter((phone) => selectedConditions.includes(phone.condition))
    }

    // Filter by storage
    if (selectedStorage.length > 0) {
      result = result.filter((phone) => selectedStorage.includes(phone.storage))
    }

    setFilteredPhones(result)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop Phones</h1>
            <p className="text-xl text-gray-600">Browse our selection of new and certified refurbished phones.</p>
          </div>
        </div>
      </section>

      {/* Store Content */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Filter className="h-5 w-5 text-gray-500" />
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {["Apple", "Samsung", "Google", "OnePlus", "Huawei", "Honor"].map((brand, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${index}`}
                          className="mr-2"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => handleFilterChange("brand", brand, e.target.checked)}
                        />
                        <label htmlFor={`brand-${index}`} className="text-gray-600">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {["Under $500", "$500 - $700", "$700 - $1000", "Over $1000"].map((range, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`price-${index}`}
                          className="mr-2"
                          checked={selectedPriceRanges.includes(range)}
                          onChange={(e) => handleFilterChange("priceRange", range, e.target.checked)}
                        />
                        <label htmlFor={`price-${index}`} className="text-gray-600">
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Condition</h3>
                  <div className="space-y-2">
                    {["New", "Refurbished", "Open Box"].map((condition, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`condition-${index}`}
                          className="mr-2"
                          checked={selectedConditions.includes(condition)}
                          onChange={(e) => handleFilterChange("condition", condition, e.target.checked)}
                        />
                        <label htmlFor={`condition-${index}`} className="text-gray-600">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storage Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Storage</h3>
                  <div className="space-y-2">
                    {["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"].map((storage, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`storage-${index}`}
                          className="mr-2"
                          checked={selectedStorage.includes(storage)}
                          onChange={(e) => handleFilterChange("storage", storage, e.target.checked)}
                        />
                        <label htmlFor={`storage-${index}`} className="text-gray-600">
                          {storage}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
                {(selectedBrands.length > 0 ||
                  selectedPriceRanges.length > 0 ||
                  selectedConditions.length > 0 ||
                  selectedStorage.length > 0) && (
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => {
                      setSelectedBrands([])
                      setSelectedPriceRanges([])
                      setSelectedConditions([])
                      setSelectedStorage([])
                      setFilteredPhones(phones)
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">
                  {filteredPhones.length === phones.length
                    ? `All Phones (${phones.length})`
                    : `Filtered Phones (${filteredPhones.length})`}
                </h2>
                <div className="flex items-center gap-4">
                  <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {totalItems > 0 && (
                          <Badge className="absolute -top-2 -right-2 bg-teal-600 text-white">{totalItems}</Badge>
                        )}
                        <span className="sr-only">Open cart</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md">
                      <SheetHeader>
                        <SheetTitle>Your Cart ({totalItems} items)</SheetTitle>
                      </SheetHeader>

                      {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh]">
                          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                          <p className="text-gray-500">Your cart is empty</p>
                          <SheetClose asChild>
                            <Button variant="link" className="mt-4">
                              Continue Shopping
                            </Button>
                          </SheetClose>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 mt-4 max-h-[70vh] overflow-auto">
                          {cart.map((item) => (
                            <div key={item.phone.id} className="flex gap-4 py-4">
                              <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.phone.image || "/placeholder.svg"}
                                  alt={item.phone.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                <h4 className="font-medium">{item.phone.name}</h4>
                                <p className="text-sm text-gray-500">{item.phone.storage}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex items-center border rounded-md">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none"
                                      onClick={() => updateQuantity(item.phone.id, item.quantity - 1)}
                                    >
                                      <Minus className="h-3 w-3" />
                                      <span className="sr-only">Decrease quantity</span>
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none"
                                      onClick={() => updateQuantity(item.phone.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span className="sr-only">Increase quantity</span>
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500"
                                    onClick={() => removeFromCart(item.phone.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove item</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="flex-shrink-0 font-medium">
                                ${(item.phone.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {cart.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>Total</span>
                              <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <Button
                              className="w-full"
                              onClick={() => {
                                // Format cart items for WhatsApp message
                                const itemsList = cart
                                  .map(
                                    (item) =>
                                      `- ${item.phone.name} (${item.phone.storage}, ${item.phone.condition}): $${item.phone.price} x ${item.quantity} = $${(item.phone.price * item.quantity).toFixed(2)}`,
                                  )
                                  .join("\n")

                                // Create the complete message
                                const message = `I want to buy this product:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}`

                                // Create WhatsApp URL with the message
                                const whatsappUrl = `https://wa.me/263779286308?text=${encodeURIComponent(message)}`

                                // Open WhatsApp in a new tab
                                window.open(whatsappUrl, "_blank")
                              }}
                            >
                              Checkout via WhatsApp
                            </Button>
                          </div>
                        </>
                      )}
                    </SheetContent>
                  </Sheet>

                  <label htmlFor="sort" className="text-gray-600">
                    Sort by:
                  </label>
                  <select id="sort" className="border rounded p-2">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhones.map((phone) => (
                  <div
                    key={phone.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image src={phone.image || "/placeholder.svg"} alt={phone.name} fill className="object-cover" />
                      {phone.condition === "Refurbished" && (
                        <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                          Refurbished
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">{phone.name}</h3>
                      <p className="text-gray-500 mb-2">
                        {phone.storage}, {phone.brand}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">${phone.price}</span>
                        <Button size="sm" className="flex items-center gap-1" onClick={() => addToCart(phone)}>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-teal-600 text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Shop With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer quality phones with excellent customer service and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Guarantee",
                description: "All our phones are thoroughly tested and come with a warranty.",
              },
              {
                title: "Expert Support",
                description: "Our team is available to help with any questions or issues.",
              },
              {
                title: "Easy Returns",
                description: "30-day hassle-free return policy for your peace of mind.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help Choosing a Phone?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts can help you find the perfect phone for your needs and budget.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
