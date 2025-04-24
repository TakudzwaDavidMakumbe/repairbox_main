"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Filter, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the Phone type


// Define the Accessory type
type Accessory = {
  id: number
  name: string
  category: string
  price: number
  brand: string
  condition: string
  image: string
}

// Define the CartItem type to handle both phones and accessories
type CartItem = {
  item: Phone | Accessory
  quantity: number
  type: "phone" | "accessory"
}

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


// Sample phone data
const phones: Phone[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    brand: "Apple",
    price: 999,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    price: 799,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-5g-r.jpg",
  },
  {
    id: 3,
    name: "Google Pixel 6",
    brand: "Google",
    price: 699,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-6.jpg",
  },
  {
    id: 4,
    name: "iPhone 12",
    brand: "Apple",
    price: 649,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg",
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 399,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg",
  },
  {
    id: 6,
    name: "OnePlus 9",
    brand: "OnePlus",
    price: 729,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-9-.jpg",
  },
  {
    id: 7,
    name: "iPhone 11",
    brand: "Apple",
    price: 499,
    storage: "128GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg",
  },
  {
    id: 8,
    name: "Google Pixel 5a",
    brand: "Google",
    price: 449,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-5a-5g.jpg",
  },
  {
    id: 9,
    name: "Samsung Galaxy A73",
    brand: "Samsung",
    price: 499,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a73-5g.jpg",
  },
  {
    id: 10,
    name: "Samsung Galaxy A56 5G",
    brand: "Samsung",
    price: 449,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a56-.jpg",
  },
  {
    id: 11,
    name: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    price: 429,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg",
  },
  {
    id: 12,
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    price: 399,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a54.jpg",
  },
  {
    id: 13,
    name: "Samsung Galaxy A34 5G",
    brand: "Samsung",
    price: 349,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a34.jpg",
  },
  {
    id: 14,
    name: "Samsung Galaxy A33 5G",
    brand: "Samsung",
    price: 329,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a33-5g.jpg",
  },
  {
    id: 15,
    name: "Samsung Galaxy A26 5G",
    brand: "Samsung",
    price: 279,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a26.jpg",
  },
  {
    id: 16,
    name: "Samsung Galaxy A25 5G",
    brand: "Samsung",
    price: 259,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a25.jpg",
  },
  {
    id: 17,
    name: "Samsung Galaxy A24",
    brand: "Samsung",
    price: 239,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a24-4g-2.jpg",
  },
  {
    id: 18,
    name: "Samsung Galaxy A15 5G",
    brand: "Samsung",
    price: 219,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a15-5g-new.jpg",
  },
  {
    id: 19,
    name: "Samsung Galaxy A15",
    brand: "Samsung",
    price: 199,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a15-lte-.jpg",
  },
  {
    id: 20,
    name: "Samsung Galaxy A14",
    brand: "Samsung",
    price: 179,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14-4g.jpg",
  },
  {
    id: 21,
    name: "Samsung Galaxy A06",
    brand: "Samsung",
    price: 149,
    storage: "32GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a06-1.jpg",
  },
  {
    id: 22,
    name: "Samsung Galaxy A05",
    brand: "Samsung",
    price: 129,
    storage: "32GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a05.jpg",
  },
  {
    id: 23,
    name: "Samsung Galaxy A04s",
    brand: "Samsung",
    price: 119,
    storage: "32GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a04s.jpg",
  },
  {
    id: 24,
    name: "Samsung Galaxy M55 5G",
    brand: "Samsung",
    price: 379,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m55.jpg",
  },
  {
    id: 25,
    name: "Samsung Galaxy M53 5G",
    brand: "Samsung",
    price: 359,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m53-5g.jpg",
  },
  {
    id: 26,
    name: "Samsung Galaxy M33 5G",
    brand: "Samsung",
    price: 329,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m33.jpg",
  },
  {
    id: 27,
    name: "Samsung Galaxy M51",
    brand: "Samsung",
    price: 349,
    storage: "128GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m51.jpg",
  },
  {
    id: 28,
    name: "Samsung Galaxy M31s",
    brand: "Samsung",
    price: 299,
    storage: "128GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m31s.jpg",
  },
  {
    id: 29,
    name: "Samsung Galaxy M31",
    brand: "Samsung",
    price: 279,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m31-sm-m315f.jpg",
  },
  {
    id: 30,
    name: "Samsung Galaxy M21",
    brand: "Samsung",
    price: 249,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m21.jpg",
  },
  {
    id: 31,
    name: "Samsung Galaxy M20",
    brand: "Samsung",
    price: 219,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m20-m205f.jpg",
  },
  {
    id: 32,
    name: "Samsung Galaxy M15 5G",
    brand: "Samsung",
    price: 199,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m15.jpg",
  },
  {
    id: 33,
    name: "Samsung Galaxy M14",
    brand: "Samsung",
    price: 179,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m14-5g-sm-m146.jpg",
  },
  {
    id: 34,
    name: "Samsung Galaxy M13",
    brand: "Samsung",
    price: 159,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m13-4g-india.jpg",
  },
  // Huawei Phones
  {
    id: 35,
    name: "Huawei Mate XT Ultimate",
    brand: "Huawei",
    price: 2999,
    storage: "1TB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-xt-ultimate.jpg",
  },
  {
    id: 36,
    name: "Huawei Mate 70 RS Ultimate",
    brand: "Huawei",
    price: 2499,
    storage: "1TB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-70-rs-ultimate.jpg",
  },
  {
    id: 37,
    name: "Huawei Mate 70 Pro+",
    brand: "Huawei",
    price: 1899,
    storage: "512GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-70-pro-plus.jpg",
  },
  {
    id: 38,
    name: "Huawei Mate 70 Pro",
    brand: "Huawei",
    price: 1499,
    storage: "512GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-70.jpg",
  },
  {
    id: 39,
    name: "Huawei Mate 70",
    brand: "Huawei",
    price: 1199,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-70.jpg",
  },
  {
    id: 40,
    name: "Huawei Mate X6",
    brand: "Huawei",
    price: 1899,
    storage: "512GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-x6-.jpg",
  },
  {
    id: 41,
    name: "Huawei MatePad Pro",
    brand: "Huawei",
    price: 899,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-pro-132.jpg",
  },
  {
    id: 42,
    name: "Huawei Mate 60",
    brand: "Huawei",
    price: 999,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-60.jpg",
  },
  {
    id: 43,
    name: "Huawei Mate X5",
    brand: "Huawei",
    price: 1699,
    storage: "512GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-x5.jpg",
  },
  {
    id: 44,
    name: "Huawei Mate 50",
    brand: "Huawei",
    price: 799,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-50.jpg",
  },
  {
    id: 45,
    name: "Huawei G9 Plus",
    brand: "Huawei",
    price: 499,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-g9-plus.jpg",
  },
  // Honor Phones
  {
    id: 46,
    name: "Honor X7c",
    brand: "Honor",
    price: 299,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/honor-play-60-plus.jpg",
  },
  {
    id: 47,
    name: "Honor X6b",
    brand: "Honor",
    price: 249,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/honor-x6b.jpg",
  },
  {
    id: 48,
    name: "Honor X9b",
    brand: "Honor",
    price: 349,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/honor-x9b.jpg",
  },
  {
    id: 49,
    name: "Honor X8c",
    brand: "Honor",
    price: 299,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/honor-x8c.jpg",
  },
  // Additional iPhones
  {
    id: 50,
    name: "iPhone 6",
    brand: "Apple",
    price: 199,
    storage: "32GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-6-2.jpg",
  },
  {
    id: 51,
    name: "iPhone 7",
    brand: "Apple",
    price: 249,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-7-1.jpg",
  },
  {
    id: 52,
    name: "iPhone 8",
    brand: "Apple",
    price: 299,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-8-new-1.jpg",
  },
  {
    id: 53,
    name: "iPhone X",
    brand: "Apple",
    price: 399,
    storage: "64GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
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
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-3.jpg",
  },
  {
    id: 55,
    name: "iPhone 15",
    brand: "Apple",
    price: 899,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
  },
  {
    id: 56,
    name: "iPhone 16",
    brand: "Apple",
    price: 1099,
    storage: "256GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
  },
]

// Sample accessories data
const accessories: Accessory[] = [
  // Chargers
  {
    id: 1,
    name: "Apple 20W USB-C Power Adapter",
    category: "Charger",
    price: 19.99,
    brand: "Apple",
    condition: "New",
    image:"https://m.media-amazon.com/images/I/61+M+fV28eL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 2,
    name: "Samsung 25W Fast Charger",
    category: "Charger",
    price: 24.99,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61e+TlEInBL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 3,
    name: "Anker 30W USB-C Charger",
    category: "Charger",
    price: 29.99,
    brand: "Anker",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61rv3p0hdzL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 4,
    name: "Belkin Wireless Charging Pad",
    category: "Charger",
    price: 39.99,
    brand: "Belkin",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61dzCygXLXL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 5,
    name: "MagSafe Charger",
    category: "Charger",
    price: 39.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/615E2JtQuEL._AC_UY327_FMwebp_QL65_.jpg",
  },

  // AirPods and Earbuds
  {
    id: 6,
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Earbuds",
    price: 249.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71MPNm92X6L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 7,
    name: "Apple AirPods (3rd Gen)",
    category: "Earbuds",
    price: 179.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61df2M5+OnL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 8,
    name: "Samsung Galaxy Buds Pro",
    category: "Earbuds",
    price: 199.99,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/41LTq51fQJS._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 9,
    name: "Google Pixel Buds Pro",
    category: "Earbuds",
    price: 199.99,
    brand: "Google",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61DGBXMDMpL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 10,
    name: "Beats Studio Buds",
    category: "Earbuds",
    price: 149.99,
    brand: "Beats",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51bRSWrEc7S._AC_UY327_FMwebp_QL65_.jpg",
  },

  // Phone Cases
  {
    id: 11,
    name: "iPhone 15 Pro Silicone Case",
    category: "Case",
    price: 49.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61wuUZ+XJVL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 12,
    name: "Samsung Galaxy S21 Clear Case",
    category: "Case",
    price: 29.99,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61buB7sBAiS._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 13,
    name: "OtterBox Defender Series for iPhone",
    category: "Case",
    price: 59.99,
    brand: "OtterBox",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51woQlZaJmS._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 14,
    name: "Spigen Tough Armor for Galaxy",
    category: "Case",
    price: 39.99,
    brand: "Spigen",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51MGWU+EFVL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    id: 15,
    name: "Mous Limitless for iPhone",
    category: "Case",
    price: 59.99,
    brand: "Mous",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71CPDpc8HEL._AC_UL480_FMwebp_QL65_.jpg",
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
  const [filteredAccessories, setFilteredAccessories] = useState<Accessory[]>(accessories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Add this after the other state declarations
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null)
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null)
  const [activeTab, setActiveTab] = useState("phones")

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.item.price * item.quantity, 0)

  // Add to cart function for phones
  const addPhoneToCart = (phone: Phone) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item.type === "phone" && item.item.id === phone.id)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { item: phone, quantity: 1, type: "phone" }]
      }
    })

    // Open the cart drawer when adding an item
    setIsCartOpen(true)
  }

  // Add to cart function for accessories
  const addAccessoryToCart = (accessory: Accessory) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item.type === "accessory" && item.item.id === accessory.id)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { item: accessory, quantity: 1, type: "accessory" }]
      }
    })

    // Open the cart drawer when adding an item
    setIsCartOpen(true)
  }

  // Remove from cart function
  const removeFromCart = (itemId: number, itemType: "phone" | "accessory") => {
    setCart((prevCart) => prevCart.filter((item) => !(item.type === itemType && item.item.id === itemId)))
  }

  // Update quantity function
  const updateQuantity = (itemId: number, itemType: "phone" | "accessory", newQuantity: number) => {
    if (newQuantity < 1) return

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.type === itemType && item.item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  // Add this function to handle checkbox changes for filters
  const handleFilterChange = (
    filterType: "brand" | "priceRange" | "condition" | "storage" | "category",
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
      case "category":
        setSelectedCategories((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
        break
    }
  }

  // Add this function to apply the filters
  const applyFilters = () => {
    // Filter phones
    let phoneResults = [...phones]

    // Filter by brand
    if (selectedBrands.length > 0) {
      phoneResults = phoneResults.filter((phone) => selectedBrands.includes(phone.brand))
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      phoneResults = phoneResults.filter((phone) => {
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
      phoneResults = phoneResults.filter((phone) => selectedConditions.includes(phone.condition))
    }

    // Filter by storage
    if (selectedStorage.length > 0) {
      phoneResults = phoneResults.filter((phone) => selectedStorage.includes(phone.storage))
    }

    setFilteredPhones(phoneResults)

    // Filter accessories
    let accessoryResults = [...accessories]

    // Filter by brand
    if (selectedBrands.length > 0) {
      accessoryResults = accessoryResults.filter((accessory) => selectedBrands.includes(accessory.brand))
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      accessoryResults = accessoryResults.filter((accessory) => {
        const price = accessory.price
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
      accessoryResults = accessoryResults.filter((accessory) => selectedConditions.includes(accessory.condition))
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      accessoryResults = accessoryResults.filter((accessory) => selectedCategories.includes(accessory.category))
    }

    setFilteredAccessories(accessoryResults)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedPriceRanges([])
    setSelectedConditions([])
    setSelectedStorage([])
    setSelectedCategories([])
    setFilteredPhones(phones)
    setFilteredAccessories(accessories)
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
                    {[
                      "Apple",
                      "Samsung",
                      "Google",
                      "OnePlus",
                      "Huawei",
                      "Honor",
                      "Anker",
                      "Belkin",
                      "OtterBox",
                      "Spigen",
                      "Beats",
                    ].map((brand, index) => (
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

                {/* Storage Filter - Only show when on Phones tab */}
                {activeTab === "phones" && (
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
                )}

                {/* Category Filter - Only show when on Accessories tab */}
                {activeTab === "accessories" && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {["Charger", "Earbuds", "Case"].map((category, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${index}`}
                            className="mr-2"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => handleFilterChange("category", category, e.target.checked)}
                          />
                          <label htmlFor={`category-${index}`} className="text-gray-600">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button className="w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
                {(selectedBrands.length > 0 ||
                  selectedPriceRanges.length > 0 ||
                  selectedConditions.length > 0 ||
                  selectedStorage.length > 0 ||
                  selectedCategories.length > 0) && (
                  <Button variant="outline" className="w-full mt-2" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">
                  {activeTab === "phones"
                    ? filteredPhones.length === phones.length
                      ? `All Phones (${phones.length})`
                      : `Filtered Phones (${filteredPhones.length})`
                    : filteredAccessories.length === accessories.length
                      ? `All Accessories (${accessories.length})`
                      : `Filtered Accessories (${filteredAccessories.length})`}
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
                          {cart.map((cartItem) => (
                            <div key={`${cartItem.type}-${cartItem.item.id}`} className="flex gap-4 py-4">
                                <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={cartItem.item.image || "/placeholder.svg"}
                                  alt={cartItem.item.name}
                                  fill
                                  sizes="(max-width: 80px) 100vw"
                                  className="object-cover p-2"
                                  priority
                                />
                                </div>
                              <div className="flex flex-col flex-1">
                                <h4 className="font-medium">{cartItem.item.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {cartItem.type === "phone"
                                    ? (cartItem.item as Phone).storage
                                    : (cartItem.item as Accessory).category}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex items-center border rounded-md">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none"
                                      onClick={() =>
                                        updateQuantity(cartItem.item.id, cartItem.type, cartItem.quantity - 1)
                                      }
                                    >
                                      <Minus className="h-3 w-3" />
                                      <span className="sr-only">Decrease quantity</span>
                                    </Button>
                                    <span className="w-8 text-center">{cartItem.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none"
                                      onClick={() =>
                                        updateQuantity(cartItem.item.id, cartItem.type, cartItem.quantity + 1)
                                      }
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span className="sr-only">Increase quantity</span>
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500"
                                    onClick={() => removeFromCart(cartItem.item.id, cartItem.type)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove item</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="flex-shrink-0 font-medium">
                                ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
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
                                  .map((cartItem) => {
                                    const itemDetails =
                                      cartItem.type === "phone"
                                        ? `(${(cartItem.item as Phone).storage}, ${cartItem.item.condition})`
                                        : `(${(cartItem.item as Accessory).category}, ${cartItem.item.condition})`

                                    return `- ${cartItem.item.name} ${itemDetails}: $${cartItem.item.price} x ${cartItem.quantity} = $${(cartItem.item.price * cartItem.quantity).toFixed(2)}`
                                  })
                                  .join("\n")

                                // Create the complete message
                                const message = `I want to buy these products:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}`

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

              {/* Tabs for Phones and Accessories */}
              <Tabs defaultValue="phones" className="mb-8" onValueChange={(value) => setActiveTab(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phones">All Phones</TabsTrigger>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                </TabsList>

                {/* Phones Tab Content */}
                <TabsContent value="phones">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhones.map((phone) => (
                      <div
                        key={phone.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image
                          src={phone.image || "/placeholder.svg"}
                          alt={phone.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{
                            objectFit: "contain",
                            padding: "1rem",
                            maxWidth: "100%",
                            maxHeight: "100%"
                          }}
                          priority
                          />
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
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold">${phone.price}</span>
                            <Button size="sm" className="flex items-center gap-1" onClick={() => addPhoneToCart(phone)}>
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => setSelectedPhone(phone)}
                          >
                            View More Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Accessories Tab Content */}
                <TabsContent value="accessories">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAccessories.map((accessory) => (
                      <div
                        key={accessory.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image
                          src={accessory.image || "/placeholder.svg"}
                          alt={accessory.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{
                            objectFit: "contain",
                            padding: "1rem",
                            maxWidth: "100%",
                            maxHeight: "100%"
                          }}
                          priority
                          />
                          <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                          {accessory.category}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">{accessory.name}</h3>
                          <p className="text-gray-500 mb-2">{accessory.brand}</p>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold">${accessory.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => addAccessoryToCart(accessory)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => setSelectedAccessory(accessory)}
                          >
                            View More Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

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
      <section className="py-16 bg-[#FF9E00] text-white">
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

      {/* Phone Details Modal */}
      {selectedPhone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="relative h-64">
              <Image
                src={selectedPhone.image || "/placeholder.svg"}
                alt={selectedPhone.name}
                fill
                className="object-cover"
              />
              {selectedPhone.condition === "Refurbished" && (
                <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                  Refurbished
                </span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedPhone.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Brand</h3>
                  <p>{selectedPhone.brand}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Price</h3>
                  <p className="text-xl font-bold text-teal-600">${selectedPhone.price}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Storage</h3>
                  <p>{selectedPhone.storage}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Condition</h3>
                  <p>{selectedPhone.condition}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">
                  The {selectedPhone.name} features a stunning display, powerful processor, and exceptional camera
                  system. With {selectedPhone.storage} of storage, you'll have plenty of space for all your apps,
                  photos, and videos.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Colors</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">Space Gray</span>
                  <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">Silver</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Gold</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>4.7-inch Retina HD display</li>
                  <li>A8 chip</li>
                  <li>8MP camera</li>
                  <li>Touch ID</li>
                  <li>iOS 8</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    addPhoneToCart(selectedPhone)
                    setSelectedPhone(null)
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => setSelectedPhone(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessory Details Modal */}
      {selectedAccessory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="relative h-64">
              <Image
                src={selectedAccessory.image || "/placeholder.svg"}
                alt={selectedAccessory.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                {selectedAccessory.category}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedAccessory.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Brand</h3>
                  <p>{selectedAccessory.brand}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Price</h3>
                  <p className="text-xl font-bold text-teal-600">${selectedAccessory.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Category</h3>
                  <p>{selectedAccessory.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Condition</h3>
                  <p>{selectedAccessory.condition}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">
                  The {selectedAccessory.name} is a high-quality {selectedAccessory.category.toLowerCase()} designed to
                  enhance your mobile experience. Made by {selectedAccessory.brand}, it offers excellent performance and
                  reliability.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Compatible With</h3>
                <p className="text-gray-600">
                  Compatible with most modern smartphones including iPhone and Android devices.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    addAccessoryToCart(selectedAccessory)
                    setSelectedAccessory(null)
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => setSelectedAccessory(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}