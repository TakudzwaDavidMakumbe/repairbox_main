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
type Phone = {
  id: number
  name: string
  brand: string
  price: number
  storage?: string
  condition: string
  image: string
  description: string
}

// Define the Tablet type
type Tablet = {
  id: number
  name: string
  brand: string
  price: number
  storage?: string
  condition: string
  image: string
  description: string
}

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

// Define the CartItem type to handle phones, tablets and accessories
type CartItem = {
  item: Phone | Tablet | Accessory
  quantity: number
  type: "phone" | "tablet" | "accessory"
}

// Sample phone data
const phones: Phone[] = [
  // Itel Phones
  {
    id: 1,
    name: "Itel A40",
    brand: "Itel",
    price: 85,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/itel-a04.jpg",
    description: 'Reliable budget smartphone with a 5.5" display and long battery life.',
  },
  {
    id: 2,
    name: "Itel A18",
    brand: "Itel",
    price: 70,
    condition: "New",
    image: "https://spellboundelectronics.com/wp-content/uploads/2024/01/4-1-600x600.png",
    description: "Compact Android phone offering core apps and durable build for daily use.",
  },
  {
    id: 3,
    name: "Itel A06",
    brand: "Itel",
    price: 80,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/itel-a60.jpg",
    description: "Entry-level handset with clean Android UI and extended standby time.",
  },
  {
    id: 4,
    name: "Itel A33 Plus",
    brand: "Itel",
    price: 70,
    condition: "New",
    image: "https://img.gsmchoice.com/phones/itel-a33-plus/phone_bigx2/itel-a33-plus-big.webp ",
    description: "Focused on battery longevity and essential functionality for on-the-go users.",
  },
  {
    id: 5,
    name: "Itel Prime",
    brand: "Itel",
    price: 150,
    condition: "New",
    image: "https://creative.co.zw/wp-content/uploads/2023/05/itel-prime-tab.jpg",
    description: "Midrange phone with large screen, solid processor, and 3-day battery life.",
  },

  // Samsung Phones
  {
    id: 6,
    name: "Samsung Galaxy A03 Core (32GB)",
    brand: "Samsung",
    price: 100,
    storage: "32GB",
    condition: "New",
    image: "https://laptopzone.co.zw/wp-content/uploads/2021/12/Samsung-Galaxy-A03-Core.png",
    description: "Vibrant 6.5″ display, reliable performance, and expandable storage slot.",
  },
  {
    id: 7,
    name: "Samsung Galaxy A04e (32GB)",
    brand: "Samsung",
    price: 100,
    storage: "32GB",
    condition: "New",
    image: "https://www.4harvests.co.zw/wp-content/uploads/2024/11/Samsung-A04E.webp",
    description: "Sleek design with 5,000 mAh battery and modern Android 12 interface.",
  },
  {
    id: 8,
    name: "Samsung Galaxy A04e (64GB)",
    brand: "Samsung",
    price: 140,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a04e.jpg",
    description: "More internal storage for apps and media plus a dual-camera setup.",
  },
  {
    id: 9,
    name: "Samsung Galaxy A05 (128GB)",
    brand: "Samsung",
    price: 100,
    storage: "128GB",
    condition: "New",
    image: "https://www.4harvests.co.zw/wp-content/uploads/2024/11/Samsung-A05-346x310.webp",
    description: "Long-lasting battery, fast charging, and clean Samsung One UI.",
  },
  {
    id: 10,
    name: "Samsung Galaxy A06",
    brand: "Samsung",
    price: 120,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a06-1.jpg",
    description: "Upgraded chipset, refined build, and 50 MP main camera.",
  },
  {
    id: 11,
    name: "Samsung Galaxy A14 (Black, 128GB)",
    brand: "Samsung",
    price: 190,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14-4g.jpg",
    description: "50 MP camera, 6.6″ FHD+ screen, and secure side-mount fingerprint.",
  },
  {
    id: 12,
    name: "Samsung Galaxy A14 (Silver, 128GB)",
    brand: "Samsung",
    price: 190,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14-5g.jpg",
    description: "Same specs as Black, with a premium silver finish.",
  },
  {
    id: 13,
    name: "Samsung Galaxy A15 (128GB)",
    brand: "Samsung",
    price: 190,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a15-5g-new.jpg",
    description: "Snapdragon processor, robust build, and adaptive refresh display.",
  },
  {
    id: 14,
    name: "Samsung Galaxy A16",
    brand: "Samsung",
    price: 190,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a16-5g.jpg",
    description: "Refined performance, improved low-light photography, and big battery.",
  },
  {
    id: 15,
    name: "Samsung Galaxy A24 (128GB)",
    brand: "Samsung",
    price: 260,
    storage: "128GB",
    condition: "New",
    image: "https://spellboundelectronics.com/wp-content/uploads/2022/11/GALAXY-A33.png",
    description: "Enhanced AMOLED display and quad-lens camera array.",
  },
  {
    id: 16,
    name: "Samsung Galaxy A25 5G",
    brand: "Samsung",
    price: 240,
    condition: "New",
    image: "https://fusertech.co.zw/wp-content/uploads/2024/07/Untitled-design21.jpg",
    description: "Next-gen connectivity, speedy UI, and 64 MP main sensor.",
  },
  {
    id: 17,
    name: "Samsung Galaxy A32 LCD (Replacement)",
    brand: "Samsung",
    price: 80,
    condition: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lUwXmb205g-malh5v2fF2E9EArYyV7M2-yd6bxOkpEgBslGT3-fgEc8&usqp=CAE&s",
    description: "Genuine OEM LCD assembly for A32 models.",
  },
  {
    id: 18,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: 390,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg",
    description: "Premium midrange with 90 Hz display and 108 MP camera.",
  },
  {
    id: 19,
    name: "Samsung Galaxy M04 (128GB)",
    brand: "Samsung",
    price: 160,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m04-.jpg",
    description: "Big battery, expandable memory, and smooth multitasking.",
  },
  {
    id: 20,
    name: "Samsung Galaxy M13 (64GB)",
    brand: "Samsung",
    price: 175,
    storage: "64GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m13-4g-india.jpg",
    description: "Balanced performance with 50 MP rear camera and decent chipset.",
  },
  {
    id: 21,
    name: "Samsung Galaxy M32 (128GB)",
    brand: "Samsung",
    price: 260,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m32-5g-new.jpg",
    description: "Vivid Super AMOLED screen and 6,000 mAh battery.",
  },
  {
    id: 22,
    name: "Samsung Galaxy M34 5G (128GB)",
    brand: "Samsung",
    price: 240,
    storage: "128GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m34-5g.jpg",
    description: "Affordable 5G speeds with reliable battery life.",
  },
  {
    id: 23,
    name: "Samsung Galaxy M53 5G",
    brand: "Samsung",
    price: 350,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m53-5g.jpg",
    description: "Feature-rich phone for power users and multimedia.",
  },
  {
    id: 24,
    name: "Samsung Galaxy F14 5G",
    brand: "Samsung",
    price: 200,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f14.jpg",
    description: "Clean software, 5,000 mAh battery, and 50 MP camera.",
  },
  {
    id: 25,
    name: "Samsung Galaxy S21 Ultra",
    brand: "Samsung",
    price: 920,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-ultra-5g-.jpg",
    description: "Flagship-grade camera, 120 Hz QHD+ display, and S Pen support.",
  },
  {
    id: 26,
    name: "Samsung Galaxy Z Fold5 (512GB)",
    brand: "Samsung",
    price: 1999,
    storage: "512GB",
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold5-5g.jpg",
    description: "Premium foldable with multitasking UI.",
  },
  {
    id: 27,
    name: "Samsung S8",
    brand: "Samsung",
    price: 130,
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s8-.jpg",
    description: "Older flagship with curved display and solid camera.",
  },

  // Apple Phones
  {
    id: 28,
    name: "iPhone X (256GB)",
    brand: "Apple",
    price: 250,
    storage: "256GB",
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg",
    description: "OLED display, Face ID, and dual-lens rear camera.",
  },
  {
    id: 29,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 1299,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg",
    description: "Apple's latest flagship with A-series chip.",
  },
  {
    id: 30,
    name: "iPhone XR",
    brand: "Apple",
    price: 80,
    condition: "Refurbished",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr-new.jpg",
    description: "Large Liquid Retina display and Face ID in a budget shell.",
  },

  // Feature Phones
  {
    id: 31,
    name: "Nokia 105",
    brand: "Nokia",
    price: 30,
    condition: "New",
    image: "https://fdn2.gsmarena.com/vv/bigpic/nokia-105.jpg",
    description: "Ultra-basic feature phone with one-month standby battery.",
  },
  {
    id: 32,
    name: "X Tigi Mobile Mbudzi",
    brand: "X Tigi",
    price: 15,
    condition: "New",
    image: "https://i0.wp.com/www.ronnaboa.com/wp-content/uploads/2021/02/X506-pic-4.png?fit=900%2C900&ssl=1",
    description: "Sturdy button-phone for calls and texts, long battery.",
  },
  {
    id: 33,
    name: "Sunelan Mbudzi",
    brand: "Sunelan",
    price: 15,
    condition: "New",
    image: "https://www.sunelan.com/upfiles/products/202310/20231073766156365.png",
    description: "Basic mobile with flashlight and FM radio feature.",
  },
  {
    id: 34,
    name: "Itel IT2163 (Mbudzi)",
    brand: "Itel",
    price: 15,
    condition: "New",
    image: "https://spellboundelectronics.com/wp-content/uploads/2024/07/3-2.png",
    description: "Entry-level phone known for durability and simplicity.",
  },
  {
    id: 35,
    name: "H Mobile 2173",
    brand: "H Mobile",
    price: 15,
    condition: "New",
    image: "https://mainmarketonline.com/wp-content/uploads/2022/01/Screenshot_20220122-160708.png",
    description: "Compact feature phone with clear audio and strong antenna.",
  },
  {
    id: 36,
    name: "Villaon",
    brand: "Villaon",
    price: 60,
    condition: "New",
    image: "https://sammertechnology.co.ke/wp-content/uploads/2024/10/V20-2.webp",
    description: "Affordable Android phone with dual cameras and big battery.",
  },

  // Keep Huawei Phones
//   {
//     id: 37,
//     name: "Huawei Mate XT Ultimate",
//     brand: "Huawei",
//     price: 2999,
//     storage: "1TB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+XT+Ultimate",
//     description: "Premium foldable with cutting-edge technology and massive storage.",
//   },
//   {
//     id: 38,
//     name: "Huawei Mate 70 RS Ultimate",
//     brand: "Huawei",
//     price: 2499,
//     storage: "1TB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70+RS+Ultimate",
//     description: "Luxury flagship with Leica optics and premium build quality.",
//   },
//   {
//     id: 39,
//     name: "Huawei Mate 70 Pro+",
//     brand: "Huawei",
//     price: 1899,
//     storage: "512GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70+Pro+",
//     description: "Advanced camera system with AI enhancements and fast charging.",
//   },
//   {
//     id: 40,
//     name: "Huawei Mate 70 Pro",
//     brand: "Huawei",
//     price: 1499,
//     storage: "512GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70+Pro",
//     description: "Powerful processor with exceptional battery life and display.",
//   },
//   {
//     id: 41,
//     name: "Huawei Mate 70",
//     brand: "Huawei",
//     price: 1199,
//     storage: "256GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+70",
//     description: "Balanced flagship with premium features at a more accessible price.",
//   },
//   {
//     id: 42,
//     name: "Huawei Mate X6",
//     brand: "Huawei",
//     price: 1899,
//     storage: "512GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+X6",
//     description: "Innovative foldable design with seamless display transition.",
//   },
//   {
//     id: 43,
//     name: "Huawei MatePad Pro",
//     brand: "Huawei",
//     price: 899,
//     storage: "256GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+MatePad+Pro",
//     description: "Premium tablet with stylus support and productivity features.",
//   },
//   {
//     id: 44,
//     name: "Huawei Mate 60",
//     brand: "Huawei",
//     price: 999,
//     storage: "256GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+60",
//     description: "Solid performance with excellent camera capabilities.",
//   },
//   {
//     id: 45,
//     name: "Huawei Mate X5",
//     brand: "Huawei",
//     price: 1699,
//     storage: "512GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+X5",
//     description: "Refined foldable with improved hinge and display durability.",
//   },
//   {
//     id: 46,
//     name: "Huawei Mate 50",
//     brand: "Huawei",
//     price: 799,
//     storage: "256GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+Mate+50",
//     description: "Feature-rich phone with excellent camera and battery performance.",
//   },
//   {
//     id: 47,
//     name: "Huawei G9 Plus",
//     brand: "Huawei",
//     price: 499,
//     storage: "128GB",
//     condition: "New",
//     image: "/placeholder.svg?height=300&width=300&text=Huawei+G9+Plus",
//     description: "Mid-range device with premium design and reliable performance.",
//   },
 ]

// Sample tablets data
const tablets: Tablet[] = [
  {
    id: 1,
    name: "Galaxy Tab A7 Lite (32GB)",
    brand: "Samsung",
    price: 155,
    storage: "32GB",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/1Q0AAOSwLwJg4VfX/s-l1600.jpg",
    description: "Lightweight 8.7″ tablet for media, reading, and web browsing.",
  },
  {
    id: 2,
    name: "Galaxy Tab A8 (64GB, Pink)",
    brand: "Samsung",
    price: 250,
    storage: "64GB",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/RzwAAOSw2WNn0A~P/s-l1600.png",
    description: "Larger 10.5″ display, quad speakers, and long battery life.",
  },
  {
    id: 3,
    name: "Galaxy Tab A9",
    brand: "Samsung",
    price: 220,
    condition: "New",
    image: "https://i.ebayimg.com/images/g/PakAAOSw1pVnIVpu/s-l500.jpg",
    description: "Refined Android tablet with improved chassis and audio.",
  },
  {
    id: 4,
    name: "Modio M19 Tab",
    brand: "Modio",
    price: 90,
    condition: "New",
    image: "https://m.media-amazon.com/images/I/31+9uG92M5L.jpg",
    description: "Budget 10″ tablet for e-learning and light browsing.",
  },
  {
    id: 5,
    name: "Cidea 5G LTE Tab (256GB)",
    brand: "Cidea",
    price: 90,
    storage: "256GB",
    condition: "New",
    image: "https://cdn.salla.sa/oYqEZ/1f132153-b07e-46c1-b372-6ec866b22a0c-1000x821-xsfgLXxsOnqNPC2d8dDsT73C8LV3bdXcn8jTwNsf.jpg",
    description: "5G-ready tablet with high storage and fast download speeds.",
  },
  {
    id: 6,
    name: "Samsung A8 Tab",
    brand: "Samsung",
    price: 250,
    condition: "New",
    image: "https://i.ebayimg.com/images/g/evQAAOSwRWFn0A~Y/s-l500.jpg",
    description: "Midrange tablet with Samsung Knox security and Dolby Atmos.",
  },
  {
    id: 7,
    name: "iPad 9th Gen 10.2″ (Cover Accessory)",
    brand: "Apple",
    price: 20,
    condition: "New",
    image: "https://i.ebayimg.com/images/g/KRIAAOSwJoZh1R9n/s-l500.jpg",
    description: "Protective cover with stand function for Apple's popular iPad.",
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
    image: "https://i.ebayimg.com/images/g/4PAAAOSwQc5n7ESr/s-l1600.jpg",
  },
  {
    id: 2,
    name: "Samsung 25W Fast Charger",
    category: "Charger",
    price: 24.99,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71blOLk9A6L._AC_UY327_QL65_.jpg",
  },
  {
    id: 3,
    name: "Anker 30W USB-C Charger",
    category: "Charger",
    price: 29.99,
    brand: "Anker",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61BbuQOmbnL._AC_UY327_QL65_.jpg",
  },
  {
    id: 4,
    name: "Belkin Wireless Charging Pad",
    category: "Charger",
    price: 39.99,
    brand: "Belkin",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51TIlCo4FOL._AC_UY327_QL65_.jpg",
  },
  {
    id: 5,
    name: "MagSafe Charger",
    category: "Charger",
    price: 39.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/615E2JtQuEL._AC_UY327_QL65_.jpg",
  },

  // Power Banks
  {
    id: 6,
    name: "Nesty 10 000 mAh 3-in-1 Power Bank",
    category: "Power Bank",
    price: 20.0,
    brand: "Nesty",
    condition: "New",
    image: "https://media.takealot.com/covers_images/7b10b286f0f744f9879d85f40041acf4/s-pdpxl.file",
  },
  {
    id: 7,
    name: "Nesty 20 000 mAh Wireless Power Bank",
    category: "Power Bank",
    price: 35.0,
    brand: "Nesty",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/nesty-grpb-p7-20000-mah-powerbank-1.file",
  },
  {
    id: 8,
    name: "OV 10 000 mAh Power Bank",
    category: "Power Bank",
    price: 20.0,
    brand: "OV",
    condition: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZf-uJ_220aGLBRHF88mZbU0_H0QbSP-jphYqdNkFx9_bGKNrm4XxWYwOJlHQ9MS8jZQ&usqp=CAU",
  },
  {
    id: 9,
    name: "Oraimo 20 000 mAh Power Bank",
    category: "Power Bank",
    price: 35.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://zelpac.co.zw/cdn/shop/files/Oraimo-PB-20k-1_1_grande.webp?v=1687948211",
  },
  {
    id: 10,
    name: "Oraimo 30 000 mAh Power Bank",
    category: "Power Bank",
    price: 45.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/7/ML/IR/LD/13377102/237-500x500.jpg",
  },
  {
    id: 11,
    name: "Oraimo 40 000 mAh Power Bank",
    category: "Power Bank",
    price: 55.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://www.classifieds.co.zw/storage/App/Models/Attachment/files/010/401/202/medium/o_1ie82oer21h98ves8p61pgilhh8.webp",
  },
  {
    id: 12,
    name: "Oraimo 50 000 mAh Power Bank",
    category: "Power Bank",
    price: 70.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSR7ynMyT_OsZearxq-yqVh0AtMpHjZ2cy5R985j6R7TJ2sVgwEyz1cS9FfiJXYrNQV35d1Q9pR7OXj-45umpsJOfFZvGcrc_K-qA2IR-JRNCcueq1remE74QeEq4llpXcEpzHZJQ&usqp=CAc",
  },
  {
    id: 13,
    name: "Just Max Wireless Charging Bank",
    category: "Power Bank",
    price: 40.0,
    brand: "Just Max",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/wireless-qi-charging-powerbank-15-000mah-grey-1.file",
  },
  {
    id: 14,
    name: "Bavin MagSafe Charger",
    category: "Power Bank",
    price: 30.0,
    brand: "Bavin",
    condition: "New",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQl3ZDMMN-2B98M41AIOWBYKLqFQD1erXxuEZFXt9LDh9vou4sDFxbfKNCa7XWifYK1iEJ_Yc2TfO3qRAysOssyciBzyh62bOt15RFFGyjCtyZBe-7mAkYJxIXD4twsvg&usqp=CAc",
  },
  {
    id: 15,
    name: "Tecno High-Speed 20 000 mAh Power Bank",
    category: "Power Bank",
    price: 30.0,
    brand: "Tecno",
    condition: "New",
    image: "https://static.reach-tele.com/uploads/thumbs/6b/6b48d250b36f0363d352b41439f07b8c.png",
  },
  {
    id: 16,
    name: "Battery Case 4 500 mAh for iPhone 11 Pro Max",
    category: "Power Bank",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.seller.gsmprice.com/image/cache/catalog/Margoun/iphone_11_Pro_Max_Battery_Case_4500mAh___2_-650x650.jpg",
  },
  {
    id: 17,
    name: "Battery Case for iPhone 12/12 Pro",
    category: "Power Bank",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/6124M24rDhL.jpg",
  },
  {
    id: 18,
    name: "Battery Case for iPhone 12/13 Pro",
    category: "Power Bank",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61x0neV+20L.jpg",
  },
  {
    id: 19,
    name: "Oraimo 27 000 mAh Power Bank",
    category: "Power Bank",
    price: 35.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://mchris.ng/wp-content/uploads/2023/07/27.jpg",
  },

  // AirPods and Earbuds
  {
    id: 20,
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Earbuds",
    price: 249.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61aFcD5ju9L._AC_UY327_QL65_.jpg",
  },
  {
    id: 21,
    name: "Apple AirPods (3rd Gen)",
    category: "Earbuds",
    price: 179.99,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71mzb4mx-yL._AC_UY327_QL65_.jpg",
  },
  {
    id: 22,
    name: "Samsung Galaxy Buds Pro",
    category: "Earbuds",
    price: 199.99,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61ReFn+YL1L._AC_UY327_QL65_.jpg",
  },
  {
    id: 23,
    name: "Google Pixel Buds Pro",
    category: "Earbuds",
    price: 199.99,
    brand: "Google",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61DGBXMDMpL._AC_UY327_QL65_.jpg",
  },
  {
    id: 24,
    name: "Beats Studio Buds",
    category: "Earbuds",
    price: 149.99,
    brand: "Beats",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51bRSWrEc7S._AC_UY327_QL65_.jpg",
  },
  {
    id: 25,
    name: "Oraimo Deep Bass Earphones",
    category: "Earbuds",
    price: 5.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00SIGuwOwlDomaAJBRsdDMXOsaeXOV7S_pQ&s",
  },
  {
    id: 26,
    name: "Samsung AKG Earphones",
    category: "Earbuds",
    price: 10.0,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/617C88brcIL._AC_UY327_QL65_.jpg",
  },
  {
    id: 27,
    name: "Samsung USB-C AKG Earphones",
    category: "Earbuds",
    price: 20.0,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61fmIvVXAOL._AC_UY327_QL65_.jpg",
  },
  {
    id: 28,
    name: "Galaxy Buds 2 Pro",
    category: "Earbuds",
    price: 40.0,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61ygxtCDiwL._AC_UY327_QL65_.jpg",
  },
  {
    id: 29,
    name: "AirPods Pro",
    category: "Earbuds",
    price: 40.0,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UY327_QL65_.jpg",
  },
  {
    id: 30,
    name: "Lenovo LivePods LP7",
    category: "Earbuds",
    price: 60.0,
    brand: "Lenovo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/514fXHbh6FL._AC_UY327_QL65_.jpg",
  },
  {
    id: 31,
    name: "Soundcore EarPods",
    category: "Earbuds",
    price: 40.0,
    brand: "Soundcore",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/iRIAAOSwLvlm0GqV/s-l1600.png",
  },
  {
    id: 32,
    name: "Tecno Buds 4 (28 h)",
    category: "Earbuds",
    price: 35.0,
    brand: "Tecno",
    condition: "New",
    image: "https://www.phoneplacekenya.com/wp-content/uploads/2025/04/Tecno-Buds-4.jpg",
  },
  {
    id: 33,
    name: "HP In-Ear Headset 150",
    category: "Earbuds",
    price: 30.0,
    brand: "HP",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61CsC5hNYWL._AC_UY327_QL65_.jpg",
  },
  {
    id: 34,
    name: "Oraimo Riff EarPods",
    category: "Earbuds",
    price: 80.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://garagesaleszw.com/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-20-at-10.18.07-AM.jpeg",
  },
  {
    id: 35,
    name: "JBL Tune 120",
    category: "Earbuds",
    price: 30.0,
    brand: "JBL",
    condition: "New",
    image: "https://mm.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc5dbfffc/JBL_TUNE120_Product_Image_Case_Open_Black.png",
  },
  {
    id: 36,
    name: "JBL Tune 110",
    category: "Earbuds",
    price: 25.0,
    brand: "JBL",
    condition: "New",
    image: "https://www.gadgetcraze.ug/web/image/product.template/109/image_1920?unique=61db864",
  },
  {
    id: 37,
    name: "VLIKE Bluetooth Earphones",
    category: "Earbuds",
    price: 20.0,
    brand: "VLIKE",
    condition: "New",
    image: "https://zero.pindula.co.zw/media/marketplace/products/iphone-earphones-vki7-vlike-7371_A9qqssj.webp",
  },
  {
    id: 38,
    name: "Blue Ocean C-Type Earphones",
    category: "Earbuds",
    price: 5.0,
    brand: "Blue Ocean",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51OyRQi1ILL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 39,
    name: "Oraimo C-Type Earphones",
    category: "Earbuds",
    price: 10.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61rZGjxeAaL._AC_UF1000,1000_QL80_.jpg",
  },

  // Bluetooth Speakers
  {
    id: 40,
    name: "Oraimo Bass Go Boom",
    category: "Bluetooth Speaker",
    price: 70.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://www.damacom.co.ke/wp-content/uploads/2024/10/71I4cIcFoWL._AC_UF10001000_QL80_.jpg",
  },
  {
    id: 41,
    name: "Oraimo Surround Sound Speaker",
    category: "Bluetooth Speaker",
    price: 45.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://image.kilimall.com/kenya/shop/store/goods/10293/2023/08/1691062366100c32a271d9dde409c9e1093b4b9bf9709.jpg",
  },
  {
    id: 42,
    name: "Xtrame Speaker",
    category: "Bluetooth Speaker",
    price: 50.0,
    brand: "Xtrame",
    condition: "New",
    image: "https://images-cdn.ubuy.ae/6355224153b92873e14de998-jbl-xtreme-3-portable-bluetooth-speaker.jpg",
  },
  {
    id: 43,
    name: "Xtrame 2 Speaker",
    category: "Bluetooth Speaker",
    price: 50.0,
    brand: "Xtrame",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/zgEAAOSw1eFdKcl6/s-l960.jpg",
  },
  {
    id: 44,
    name: "Xtrame 3 Speaker",
    category: "Bluetooth Speaker",
    price: 60.0,
    brand: "Xtrame",
    condition: "New",
    image: "https://techbuyz.co.ke/wp-content/uploads/2022/04/81zaosopNbL._AC_SL1500_.jpg",
  },
  {
    id: 45,
    name: "Charge 3 Speaker",
    category: "Bluetooth Speaker",
    price: 30.0,
    brand: "JBL",
    condition: "New",
    image: "https://pacifichifi.s3.ap-southeast-2.amazonaws.com/wp-content/uploads/2021/07/10044413/JBL-Charge-3-Full-featured-Waterproof-Portable-Speaker-Grey-Angle-1.jpg",
  },
  {
    id: 46,
    name: "Charge 4 Speaker",
    category: "Bluetooth Speaker",
    price: 30.0,
    brand: "JBL",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61tvFn1zW9L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 47,
    name: "Flip 5 Speaker",
    category: "Bluetooth Speaker",
    price: 40.0,
    brand: "JBL",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/ZxIAAOSwb6pnOlj-/s-l1600.png",
  },
  {
    id: 48,
    name: "Flip 6 Speaker",
    category: "Bluetooth Speaker",
    price: 160.0,
    brand: "JBL",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/RgcAAOSwRZVlha3g/s-l1600.jpg",
  },
  {
    id: 49,
    name: "JBL Clip 4",
    category: "Bluetooth Speaker",
    price: 90.0,
    brand: "JBL",
    condition: "New",
    image: "https://audioshopnepal.com/wp-content/uploads/2023/05/CLIP4-RD-04.jpg",
  },
  {
    id: 50,
    name: "JBL Go2",
    category: "Bluetooth Speaker",
    price: 50.0,
    brand: "JBL",
    condition: "New",
    image: "https://i0.wp.com/tvsales.co.zw/wp-content/uploads/2022/09/ENTERTAINMENT_OB-MP-GB-431520162_1.jpg?fit=900%2C900&ssl=1",
  },
  {
    id: 51,
    name: "Party Box Encore",
    category: "Bluetooth Speaker",
    price: 480.0,
    brand: "JBL",
    condition: "New",
    image: "https://shopbw.co.bw/wp-content/uploads/2023/11/BL-PB-Encore-MIC1.jpg",
  },
  {
    id: 52,
    name: "Dynamic Speaker",
    category: "Bluetooth Speaker",
    price: 120.0,
    brand: "Generic",
    condition: "New",
    image: "https://toptechus.com/cdn/shop/files/AmazonRCA-15Dynamic-01.jpg?v=1720456691",
  },
  {
    id: 53,
    name: "HoCo BS47",
    category: "Bluetooth Speaker",
    price: 25.0,
    brand: "HoCo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71MiRg1l1sL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 54,
    name: "Nesty Boombox",
    category: "Bluetooth Speaker",
    price: 30.0,
    brand: "Nesty",
    condition: "New",
    image: "https://jupitergearhome.com/cdn/shop/products/5656393dbb9e19f168733ef0a3cd59f8.png?v=1697040218",
  },
  {
    id: 55,
    name: "Ripple Beat Maker",
    category: "Bluetooth Speaker",
    price: 120.0,
    brand: "Ripple",
    condition: "New",
    image: "https://store.hifuturegroup.com/cdn/shop/products/1_15cedf10-2cd9-40ed-9b05-6e23c4d29d85.jpg?v=1673841282",
  },

  // Watches
  {
    id: 56,
    name: "Apple Watch Series 6",
    category: "Watch",
    price: 40.0,
    brand: "Apple",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51rQ99P6djL._AC_UY327_QL65_.jpg",
  },
  {
    id: 57,
    name: "Galaxy Watch 4",
    category: "Watch",
    price: 180.0,
    brand: "Samsung",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/xWsAAOSwiVln5GSP/s-l500.jpg",
  },
  {
    id: 58,
    name: "Itel IFB-11 Smartwatch",
    category: "Watch",
    price: 20.0,
    brand: "Itel",
    condition: "New",
    image: "https://d1iv6qgcmtzm6l.cloudfront.net/products/lg_SMwMaTNiA0U8UC5ldVvfBWvHqQfmbWlFteZQU8FM.jpg",
  },
  {
    id: 59,
    name: "Z66 Ultra Smartwatch",
    category: "Watch",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://gelit.ge/images/detailed/33/sg-11134201-22120-w888i4mcvmkvbc_ivp1-ib.jpg",
  },
  {
    id: 60,
    name: "Watch 10:09 T500",
    category: "Watch",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.maisto.co.zw/wp-content/uploads/2018/04/9274092_img-20200323-193156_666x671.jpg",
  },
  {
    id: 61,
    name: "Tecno Watch 3",
    category: "Watch",
    price: 45.0,
    brand: "Tecno",
    condition: "New",
    image: "https://cdn-eshop.jo.zain.com/images/thumbs/0060027_tecno-watch-3_600.webp",
  },
  {
    id: 62,
    name: "Tecno Watch Pro 2",
    category: "Watch",
    price: 60.0,
    brand: "Tecno",
    condition: "New",
    image: "https://thetomorrowtechnology.co.ke/wp-content/uploads/2024/05/watch-pro-3-2.png",
  },
  {
    id: 63,
    name: "X Series X6100 Watch",
    category: "Watch",
    price: 30.0,
    brand: "X Series",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/41QxJHuM6sL.jpg",
  },
  {
    id: 64,
    name: "DT900 Ultra 9 Watch",
    category: "Watch",
    price: 45.0,
    brand: "Generic",
    condition: "New",
    image: "https://gadgetcity.lk/wp-content/uploads/2023/06/19f429ba7810b01448afba421bf64b65.jpg",
  },
  {
    id: 65,
    name: "Smart Watch (Generic)",
    category: "Watch",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://img.freepik.com/premium-photo/blue-generic-smart-watch_110488-623.jpg",
  },
  {
    id: 66,
    name: "Lithium 3 V Battery",
    category: "Watch",
    price: 2.0,
    brand: "Generic",
    condition: "New",
    image: "https://images.thdstatic.com/productImages/4e176120-ac19-4f0c-aa89-1ebe5e3242d3/svn/duracell-coin-button-cell-batteries-004133303534-64_600.jpg",
  },
  {
    id: 67,
    name: "Extra Watch Bands (for all models)",
    category: "Watch",
    price: 15.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/-1EAAOSw5VtmAbE8/s-l1600.jpg",
  },

  // Laptop Accessories
  {
    id: 68,
    name: "USB Flash Drive 2 GB",
    category: "Laptop Accessory",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61lrRFxDPHL._AC_UY327_QL65_.jpg",
  },
  {
    id: 69,
    name: "USB Flash Drive 8 GB",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/jqcAAOSwbf9oB4KE/s-l1600.jpg",
  },
  {
    id: 70,
    name: "USB Flash Drive 16 GB",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://lh4.googleusercontent.com/proxy/iqzHWYQasc5hSN_hNplGhPmztLlE-5C5aXqHNFRGr_lGZrwe8wd9x-7j_pMGNTe9c5SA3VpxlcDaMOf1PH3OC4sIBfZ6kbrUvlwZiDKcWVhdjwx8ItNsS4A7orkybcOtWvPz0cVOccBAl3AFQg",
  },
  {
    id: 71,
    name: "USB Flash Drive 32 GB",
    category: "Laptop Accessory",
    price: 15.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/nJMAAOSwN59lVJC8/s-l1600.jpg",
  },
  {
    id: 72,
    name: "USB Flash Drive 64 GB",
    category: "Laptop Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://lh4.googleusercontent.com/proxy/8IKZeoYR8DQTyeUmJJLGGQvYCvead3_GGdlku3GXt3VzApxEop7oiMkkYBZlWc1wGI1-jAr9PbPNXKoZ4CpGU0IwOHZtvJDTfW6YAI6EPFi0gAOAlKsfAc2kExkfKtpz",
  },
  {
    id: 73,
    name: "USB Flash Drive 128 GB",
    category: "Laptop Accessory",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://fusertech.co.zw/wp-content/uploads/2023/09/Untitled-940-%C3%97-940-px55.png",
  },
  {
    id: 74,
    name: "2 GB Memory Card",
    category: "Laptop Accessory",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.oempcworld.com/mm5/graphics/00000001/007511.jpg",
  },
  {
    id: 75,
    name: "4 GB Memory Card",
    category: "Laptop Accessory",
    price: 8.0,
    brand: "Generic",
    condition: "New",
    image: "https://computechstore.in/wp-content/uploads/2024/01/EVM-4GB-Micro-Sd-Card-Class-10-Memory-Card-1-e1705639134872.jpg",
  },
  {
    id: 76,
    name: "8 GB Memory Card",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/0oEAAOSwsF1kIpd6/s-l1200.jpg",
  },
  {
    id: 77,
    name: "16 GB Memory Card",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7mPvYd4s5P6-2VjkEOG_bHVlKQ3MxKMWCgg&s",
  },
  {
    id: 78,
    name: "32 GB Memory Card",
    category: "Laptop Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.jbhifi.com.au/cdn/shop/products/594952-Product-0-I-637962378182859520.jpg?v=1660606480",
  },
  {
    id: 79,
    name: "64 GB Memory Card",
    category: "Laptop Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71-9vJst-lL.jpg",
  },
  {
    id: 80,
    name: "128 GB Memory Card",
    category: "Laptop Accessory",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://gppro.in/wp-content/uploads/2024/11/GFJG.jpg",
  },
  {
    id: 81,
    name: "External Hard Drive 1 TB (Toshiba)",
    category: "Laptop Accessory",
    price: 70.0,
    brand: "Toshiba",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/C2kAAOSw-EZeowSR/s-l400.jpg",
  },
  {
    id: 82,
    name: "External SSD 500 GB",
    category: "Laptop Accessory",
    price: 80.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/60AAAOSw2yxmL-KS/s-l1600.jpg",
  },
  {
    id: 83,
    name: "Laptop Cooling Pad GF-NCP05",
    category: "Laptop Accessory",
    price: 25.0,
    brand: "Generic",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/laptop-cooling-pad-12-17-inch-laptop-cooler-2-fans-with-adjustable-height-1.file",
  },
  {
    id: 84,
    name: "Laptop Stand & Riser",
    category: "Laptop Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/adjustable-folding-laptop-standholderriser-black-1.file",
  },
  {
    id: 85,
    name: "Wired Mouse",
    category: "Laptop Accessory",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61hzuoXwjqL._AC_UY327_QL65_.jpg",
  },
  {
    id: 86,
    name: "Wireless Bluetooth Mouse",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/41-Bu9JkiyL._AC_UL960_QL65_.jpg",
  },
  {
    id: 87,
    name: "Gaming Mouse",
    category: "Laptop Accessory",
    price: 15.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61vF4LdktpL._AC_UY327_QL65_.jpg",
  },
  {
    id: 88,
    name: "Ergonomic Mouse Pad",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://images-cdn.ubuy.qa/66b421df9fbf5245a26cb4c8-tecknet-2-pack-mouse-pad-with-wrist.jpg",
  },
  {
    id: 89,
    name: "Mechanical Keyboard",
    category: "Laptop Accessory",
    price: 25.0,
    brand: "Generic",
    condition: "New",
    image: "https://media.currys.biz/i/currysprod/10256917?$l-large$&fmt=auto",
  },
  {
    id: 90,
    name: "Wireless Keyboard & Mouse Kit",
    category: "Laptop Accessory",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://zelpac.co.zw/cdn/shop/products/K220-0-1200x1200.jpg?v=1593003018",
  },
  {
    id: 91,
    name: "Presentation Laser Remote (Logitech R400)",
    category: "Laptop Accessory",
    price: 40.0,
    brand: "Logitech",
    condition: "New",
    image: "https://starlite.com.gh/cdn/shop/products/presenter-logitechr400-22.jpg?v=1607106361&width=1000",
  },
  {
    id: 92,
    name: "HDMI Cable 3 m",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/TU8AAOSwdGFYpM2v/s-l1600.jpg",
  },
  {
    id: 93,
    name: "Ethernet Cable 1 m",
    category: "Laptop Accessory",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/Wt8AAOSw4kFnNxNc/s-l1600.jpg",
  },
  {
    id: 94,
    name: "USB-C to HDMI Adapter",
    category: "Laptop Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/YqwAAOSwYXli88VH/s-l1600.jpg",
  },
  {
    id: 95,
    name: "USB Hub 4-Port",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/v5EAAOSwsqxmqMPi/s-l500.jpg",
  },
  {
    id: 96,
    name: "USB-C Multiport Hub (11-in-1)",
    category: "Laptop Accessory",
    price: 40.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71HUdifH8nL._AC_UY327_QL65_.jpg",
  },
  {
    id: 97,
    name: "Wireless Mics",
    category: "Laptop Accessory",
    price: 35.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.jbl.com.au/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw711d1d73/JBL_PARTYBOX_WIRELESS_MIC_HERO_V1_48627_x1.png?sw=537&sfrm=png",
  },
  {
    id: 98,
    name: "XLR Cable 3 m",
    category: "Laptop Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71a6cAfmO8L._AC_UL480_QL65_.jpg",
  },
  {
    id: 99,
    name: "Laptop Speakers",
    category: "Laptop Accessory",
    price: 25.0,
    brand: "Generic",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/astrum-su020-usb-powered-led-speakers-20ch-portable-stereo-sound-bass-2.file",
  },
  {
    id: 100,
    name: "Printer (Canon Pixma MG2545S)",
    category: "Laptop Accessory",
    price: 70.0,
    brand: "Canon",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/canon-pixma-mg2545s-a4-3-in-1-printer-black-2-extra-large-cartridges-1.file",
  },
  {
    id: 101,
    name: "DVD Writer",
    category: "Laptop Accessory",
    price: 40.0,
    brand: "Generic",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/pop-up-mobile-usb-dvd-rw-external-optical-drive-1-3.file",
  },

  // Adapters & Power Solutions
  {
    id: 102,
    name: "Universal Travel Adapter",
    category: "Adapter",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/rRgAAOSwG0pn2EYe/s-l1600.png",
  },
  {
    id: 103,
    name: "Oraimo Powerhub 2 (4 USB Ports)",
    category: "Adapter",
    price: 20.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://oraimozimbabwe.co.zw/wp-content/uploads/2023/08/ows-u351_-680-removebg-preview.png",
  },
  {
    id: 104,
    name: "OALE 10-Outlet Power Adapter",
    category: "Adapter",
    price: 30.0,
    brand: "OALE",
    condition: "New",
    image: "https://cdn11.bigcommerce.com/s-idcdidwm48/images/stencil/1280x1280/products/8334/34267/41ShphjxCML._SX522___60052.1661171617.jpg?c=2",
  },
  {
    id: 105,
    name: "R-Star 4-Way Adapter",
    category: "Adapter",
    price: 15.0,
    brand: "R-Star",
    condition: "New",
    image: "https://www.lightmarket.co.za/cdn/shop/products/4-way-adaptor-1-x-5a-schuko-3-x-za-plug-r-38-reddisson-light-market.png?v=1698406096",
  },
  {
    id: 106,
    name: "Type-C OTG Adapter",
    category: "Adapter",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51Pqq5+C8TL.jpg",
  },
  {
    id: 107,
    name: "VGA to HDMI Adapter with Audio",
    category: "Adapter",
    price: 15.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61rHDT+y2mL._AC_SL1500_.jpg",
  },
  {
    id: 108,
    name: "3.5 mm AUX Cable",
    category: "Adapter",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71DkO+cMCpL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 109,
    name: "USB to SD Card Reader",
    category: "Adapter",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://uniaccessories.com/cdn/shop/products/pixel-or-usb-a-to-sdmicrosd-card-reader-or-uhs-i-or-uni-1_57323a76-5bc2-4908-b175-96f9aacd66c6.jpg?v=1664272589",
  },
  {
    id: 110,
    name: "Round-to-Square Power Adapter",
    category: "Adapter",
    price: 5.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.firstshop.co.za/cdn/shop/files/mta1513-chargers-and-adapters-44171435638948.png?v=1708605823&width=640",
  },
  {
    id: 111,
    name: "USB-C to 3.5 mm Audio Adapter",
    category: "Adapter",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://images-cdn.ubuy.co.in/635142615a774c22a245e572-usb-c-to-3-5mm-audio-adapter-headphone.jpg",
  },

  // Gaming & Consoles
  {
    id: 112,
    name: "PlayStation 5 Slim",
    category: "Gaming",
    price: 750.0,
    brand: "Sony",
    condition: "New",
    image: "https://i5.walmartimages.com/seo/Sony-PlayStation-5-Slim-Digital-Console-with-Extra-Glacier-White-Controller_7ec256d0-7ae7-44cd-9967-79752eb3214e.8f59697894e9ea78b9329a38651a4c64.jpeg",
  },
  {
    id: 113,
    name: "PlayStation 5 Controller (Red/White)",
    category: "Gaming",
    price: 90.0,
    brand: "Sony",
    condition: "New",
    image: "https://us.maxgaming.com/img/bilder/artiklar/28268.jpg?m=1695908027&w=720",
  },
  {
    id: 114,
    name: "PlayStation 4 Console",
    category: "Gaming",
    price: 380.0,
    brand: "Sony",
    condition: "New",
    image: "https://i5.walmartimages.com/seo/Sony-PlayStation-4-Slim-500GB-Console_20ddf697-5b4b-4323-ae66-be23d899d5ee.a5b0db1eecb5e3d49379f3148e69506b.jpeg",
  },
  {
    id: 115,
    name: "PlayStation 4 Controller",
    category: "Gaming",
    price: 45.0,
    brand: "Sony",
    condition: "New",
    image: "https://cdn11.bigcommerce.com/s-ymgqt/images/stencil/1280x1280/products/55426/65292/unnamed__81343.1724866787.jpg?c=2",
  },
  {
    id: 116,
    name: "Xbox Series S",
    category: "Gaming",
    price: 450.0,
    brand: "Microsoft",
    condition: "New",
    image: "https://i5.walmartimages.com/seo/Microsoft-XBOX-Series-S-512GB-Console-Region-Free_ebedc396-d50d-4db2-a844-0965c5521897.745480de51d3080056b7cbfc47ddbf31.jpeg",
  },
  {
    id: 117,
    name: "Xbox Controller (Blue)",
    category: "Gaming",
    price: 80.0,
    brand: "Microsoft",
    condition: "New",
    image: "https://i5.walmartimages.com/seo/Microsoft-Xbox-Wireless-Controller-Sky-Cypher_254a30f2-2b48-4264-b432-fa7505ffe499.cc217fff50c02f7f999afd70279bd2a4.jpeg",
  },
  {
    id: 118,
    name: "Nintendo Switch",
    category: "Gaming",
    price: 300.0,
    brand: "Nintendo",
    condition: "New",
    image: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/en_US/products/hardware/nintendo-switch-lite-turquoise/110663-nintendo-switch-lite-turquoise-package-1200x675",
  },
  {
    id: 119,
    name: "Nintendo Switch Controllers",
    category: "Gaming",
    price: 60.0,
    brand: "Nintendo",
    condition: "New",
    image: "https://i5.walmartimages.com/seo/Joypad-Controller-Nintendo-Switch-Wireless-Joypad-Replacement-Switch-Controller-Left-Right-Switch-Joycons-Support-Dual-Vibration-Wake-up-Function-Mot_a5f001e4-be67-42b6-b555-26ad1a5a4902.9923b91145bab6f8e937e43588b4a14d.jpeg",
  },
  {
    id: 120,
    name: "Meta Quest 3S",
    category: "Gaming",
    price: 550.0,
    brand: "Meta",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51iBxYN4P-L.jpg",
  },
  {
    id: 121,
    name: "Gaming Kit 4-in-1 Bundle",
    category: "Gaming",
    price: 40.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51Rr7SIq6iL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 122,
    name: "T-Dagger Gaming Headphones",
    category: "Gaming",
    price: 45.0,
    brand: "T-Dagger",
    condition: "New",
    image: "https://hafeezcenterlhr.com/wp-content/uploads/2024/04/T-Dagger-RGB-7.1-Headset-3-1200x1200.jpg",
  },
  {
    id: 123,
    name: "HP Gaming Headphones",
    category: "Gaming",
    price: 45.0,
    brand: "HP",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/zWsAAOSwFrFk92Ni/s-l1600.jpg",
  },
  {
    id: 124,
    name: "Bluetooth Controller 6-in-1",
    category: "Gaming",
    price: 30.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/7VcAAOSwjxthpThT/s-l1600.jpg",
  },

  // TV & Home Entertainment
  {
    id: 125,
    name: "Hisense 55″ Smart TV",
    category: "TV Accessory",
    price: 550.0,
    brand: "Hisense",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/12/hisense-55-inch-smart-uhd-tv-55a6k-1-768x768.webp",
  },
  {
    id: 126,
    name: "Fire TV Stick 4K",
    category: "TV Accessory",
    price: 70.0,
    brand: "Amazon",
    condition: "New",
    image: "https://mediaspace.mu/wp-content/uploads/2024/12/518n2Z-ETbL._AC_SL1000_.jpg",
  },
  {
    id: 127,
    name: "Mi Box 4K",
    category: "TV Accessory",
    price: 120.0,
    brand: "Xiaomi",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61hM3aSX-WL._AC_SL1312_.jpg",
  },
  {
    id: 128,
    name: "Xiaomi TV Box S",
    category: "TV Accessory",
    price: 80.0,
    brand: "Xiaomi",
    condition: "New",
    image: "https://www.mytrendyphone.eu/images/Xiaomi-Mi-Box-S-2nd-Gen-4K-TV-Box-Black-6971408157044-09052023-01-p.webp",
  },
  {
    id: 129,
    name: "Keson TV Box",
    category: "TV Accessory",
    price: 60.0,
    brand: "Keson",
    condition: "New",
    image: "https://www.savemari.com/uploads/advert_images/4838-0-73005900-1594768436.jpg",
  },
  {
    id: 130,
    name: "Ultra-Short Throw Projector",
    category: "TV Accessory",
    price: 70.0,
    brand: "Generic",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/12/4k-ultra-hd-smart-projector-with-remote-1-1-768x436.png",
  },
  {
    id: 131,
    name: "LED Stage Lighting",
    category: "TV Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://www.ubuy.co.zw/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFXYzBFaytlbEwuX0FDX1NMMTUwMF8uanBn.jpg",
  },
  {
    id: 132,
    name: "DSTV Universal Remote",
    category: "TV Accessory",
    price: 10.0,
    brand: "DSTV",
    condition: "New",
    image: "https://media.takealot.com/covers_tsins/46650490/46650490-2-pdpxl.jpeg",
  },
  {
    id: 133,
    name: "HDMI Splitter (1 in → 2 out)",
    category: "TV Accessory",
    price: 15.0,
    brand: "Generic",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/61VNNGvb4PL.jpg",
  },
  {
    id: 134,
    name: "HDMI Switch (3 in → 1 out)",
    category: "TV Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/thumbs/images/g/x10AAOSw7uZmLrrD/s-l500.jpg",
  },

  // Car Electronics & Accessories
  {
    id: 135,
    name: "Oraimo Hydra 3 Car Mount",
    category: "Car Accessory",
    price: 20.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://s3.us-east-1.amazonaws.com/terangas-production/app/public/spree/products/1666/large/Oraimo_Secure_Car_Mount_%E2%80%93_Mobile_Holder_%E2%80%93_360_Degree_Rotation_-_Hydra_2.png?1663942752",
  },
  {
    id: 136,
    name: "PNY Magnetic Windshield Mount",
    category: "Car Accessory",
    price: 20.0,
    brand: "PNY",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/41zXnMycjdL.jpg",
  },
  {
    id: 137,
    name: "Silicone Sucker Phone Holder",
    category: "Car Accessory",
    price: 10.0,
    brand: "Generic",
    condition: "New",
    image: "https://saamaan.pk/cdn/shop/files/Sfa4d7200072d4dd4b8b233e5731c611bj.webp?v=1699022799",
  },
  {
    id: 138,
    name: "Oraimo Car Charger (3 Port USB)",
    category: "Car Accessory",
    price: 10.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://zelpac.co.zw/cdn/shop/files/EHWeiXMFPRTlJaNjt7PApKWBD30lx54pZYORMD79.jpg?v=1687871664",
  },
  {
    id: 139,
    name: "Samsung Fast Car Charger (C+USB)",
    category: "Car Accessory",
    price: 15.0,
    brand: "Samsung",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51Thp0LHeaL.jpg",
  },
  {
    id: 140,
    name: "15W Magnetic Wireless Car Charger",
    category: "Car Accessory",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://digipower.com/cdn/shop/products/AMAZON-AMZ-MAG-WMMI-01.jpg?v=1638894499",
  },
  {
    id: 141,
    name: "USB Car Charger CSB",
    category: "Car Accessory",
    price: 10.0,
    brand: "CSB",
    condition: "New",
    image: "https://www.batteries.gr/media/catalog/product/g/_/g.jpg",
  },
  {
    id: 142,
    name: "FM Modulator (Alison, Car FM M20)",
    category: "Car Accessory",
    price: 10.0,
    brand: "Alison",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/519CCMBRNNL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 143,
    name: "Dash Cam HD",
    category: "Car Accessory",
    price: 50.0,
    brand: "Generic",
    condition: "New",
    image: "https://img.kentfaith.com/cache/catalog/products/us/GW41.0096/GW41.0096-11-518x518.jpg",
  },

  // Sound & Audio Gear
  {
    id: 144,
    name: "Sanma Dynamic Microphone",
    category: "Audio Gear",
    price: 15.0,
    brand: "Sanma",
    condition: "New",
    image: "https://ae01.alicdn.com/kf/H640a8468e9754fab97dfdc8a6cdc3332i.jpg_640x640q90.jpg",
  },
  {
    id: 145,
    name: "Yamaha Wireless Microphone",
    category: "Audio Gear",
    price: 50.0,
    brand: "Yamaha",
    condition: "New",
    image: "https://europe.yamaha.com/en/files/HDXLRMIC_03_a0f76bc5da52302f2b16e79ff5fc1c88.jpg?impolicy=resize&imwid=735&imhei=735?imbypass=on",
  },
  {
    id: 146,
    name: "Professional Universal Wireless Mic",
    category: "Audio Gear",
    price: 45.0,
    brand: "Generic",
    condition: "New",
    image: "https://i0.wp.com/www.zoom.bh/wp-content/uploads/2024/08/s-l1600.webp?fit=800%2C800&ssl=1",
  },
  {
    id: 147,
    name: "Soundcore Life 2 Neo Headphones",
    category: "Audio Gear",
    price: 120.0,
    brand: "Soundcore",
    condition: "New",
    image: "https://cdn.shopify.com/s/files/1/0603/4296/0348/files/61FhUwy4myL._AC_SY879.jpg?v=1729051212",
  },
  {
    id: 148,
    name: "Oraimo Booming Bass Headphones",
    category: "Audio Gear",
    price: 45.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://sellconnectug.com/wp-content/uploads/2024/06/1000525848.jpg",
  },
  {
    id: 149,
    name: "Lenovo H401 Gaming Headset",
    category: "Audio Gear",
    price: 45.0,
    brand: "Lenovo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/51a+L+BILFL.jpg",
  },

  // Board & Card Games
  {
    id: 150,
    name: "Monopoly Game",
    category: "Board Game",
    price: 20.0,
    brand: "Hasbro",
    condition: "New",
    image: "https://www.hasbro.com/common/productimages/en_US/7EABAF9750569047F5778F4663C79E75/88cd6868e32c2540895c8dc1609ec067430142dd.jpg",
  },
  {
    id: 151,
    name: "Scrabble Original",
    category: "Board Game",
    price: 20.0,
    brand: "Mattel",
    condition: "New",
    image: "https://images-na.ssl-images-amazon.com/images/I/516Y70I2jmL.jpg",
  },
  {
    id: 152,
    name: "Chess Game",
    category: "Board Game",
    price: 15.0,
    brand: "Generic",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/-HcAAOSw6TVn2KkQ/s-l1600.png",
  },
  {
    id: 153,
    name: "Jenga 54-Piece Blocks",
    category: "Board Game",
    price: 20.0,
    brand: "Hasbro",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/tWoAAOSw279hmCLA/s-l1600.jpg",
  },
  {
    id: 154,
    name: "Twister",
    category: "Board Game",
    price: 20.0,
    brand: "Hasbro",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/0EMAAOSwj5VnGzki/s-l1600.png",
  },
  {
    id: 155,
    name: "30 Seconds Game",
    category: "Board Game",
    price: 20.0,
    brand: "Generic",
    condition: "New",
    image: "https://image.smythstoys.com/zoom/109103.webp",
  },
  {
    id: 156,
    name: "Cards Against Humanity",
    category: "Board Game",
    price: 20.0,
    brand: "Cards Against Humanity LLC",
    condition: "New",
    image: "https://target.scene7.com/is/image/Target/GUEST_e48a7fee-314a-495f-bbf0-4ff2fac5e07a",
  },

  // Hair Clippers & Grooming
  {
    id: 157,
    name: "Oraimo Hair Clipper",
    category: "Grooming",
    price: 60.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71MjpuegSkL.jpg",
  },
  {
    id: 158,
    name: "Oraimo Smooth-to-Shave Clipper",
    category: "Grooming",
    price: 30.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71-C3hIns9L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 159,
    name: "Oraimo Home Cut Clipper",
    category: "Grooming",
    price: 30.0,
    brand: "Oraimo",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71sB8Fz1-cL.jpg",
  },
  {
    id: 160,
    name: "Wahl Cordless Taper Clipper",
    category: "Grooming",
    price: 60.0,
    brand: "Wahl",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71JMSAeoCGL.jpg",
  },
  {
    id: 161,
    name: "Wahl Pro Super Taper Clipper",
    category: "Grooming",
    price: 50.0,
    brand: "Wahl",
    condition: "New",
    image: "https://au.wahl.com/media/catalog/product/8/5/8592-100br_super_taper_cordless_pro_hero_rgb.jpg?optimize=medium&fit=bounds&height=600&width=600&canvas=600:600",
  },
  {
    id: 162,
    name: "Daling Professional Clipper",
    category: "Grooming",
    price: 45.0,
    brand: "Daling",
    condition: "New",
    image: "https://raines.africa/wp-content/uploads/2024/11/daling-professional-hair-clippers-dl-1539-1.file",
  },

  // Phone Cases
  {
    id: 163,
    name: "iPhone 15 Pro Silicone Case",
    category: "Case",
    price: 49.99,
    brand: "Apple",
    condition: "New",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT1L3_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=UFlmaDBKdDV3VWJFekhqN1RrTHN0MVZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUTFwOE1va1JNVTZkZnVQV2dlQzQ5ZEE",
  },
  {
    id: 164,
    name: "Samsung Galaxy S21 Clear Case",
    category: "Case",
    price: 29.99,
    brand: "Samsung",
    condition: "New",
    image: "https://i.ebayimg.com/images/g/tPsAAOSwZm5msJR6/s-l1600.jpg",
  },
  {
    id: 165,
    name: "OtterBox Defender Series for iPhone",
    category: "Case",
    price: 59.99,
    brand: "OtterBox",
    condition: "New",
    image: "https://m.media-amazon.com/images/I/71thao6ItvL.jpg",
  },
  {
    id: 166,
    name: "Spigen Tough Armor for Galaxy",
    category: "Case",
    price: 39.99,
    brand: "Spigen",
    condition: "New",
    image: "https://www.spigen.com/cdn/shop/files/detail_web_s24fe_tougharmormagfit_01_1be792b2-c452-454f-8a91-6556b82e4b47.jpg?v=1745279322&width=1946",
  },
  {
    id: 167,
    name: "Mous Limitless for iPhone",
    category: "Case",
    price: 59.99,
    brand: "Mous",
    condition: "New",
    image: "https://images-na.ssl-images-amazon.com/images/I/713i0d2Fd3L._UL500_.jpg",
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
  const [filteredTablets, setFilteredTablets] = useState<Tablet[]>(tablets)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Add this after the other state declarations
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null)
  const [selectedTablet, setSelectedTablet] = useState<Tablet | null>(null)
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

  // Add to cart function for tablets
  const addTabletToCart = (tablet: Tablet) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item.type === "tablet" && item.item.id === tablet.id)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { item: tablet, quantity: 1, type: "tablet" }]
      }
    })

    // Open the cart drawer when adding an item
    setIsCartOpen(true)
  }

  // Remove from cart function
  const removeFromCart = (itemId: number, itemType: "phone" | "tablet" | "accessory") => {
    setCart((prevCart) => prevCart.filter((item) => !(item.type === itemType && item.item.id === itemId)))
  }

  // Update quantity function
  const updateQuantity = (itemId: number, itemType: "phone" | "tablet" | "accessory", newQuantity: number) => {
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
      phoneResults = phoneResults.filter((phone) => phone.storage && selectedStorage.includes(phone.storage))
    }

    setFilteredPhones(phoneResults)

    // Filter tablets
    let tabletResults = [...tablets]

    // Filter by brand
    if (selectedBrands.length > 0) {
      tabletResults = tabletResults.filter((tablet) => selectedBrands.includes(tablet.brand))
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      tabletResults = tabletResults.filter((tablet) => {
        const price = tablet.price
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
      tabletResults = tabletResults.filter((tablet) => selectedConditions.includes(tablet.condition))
    }

    // Filter by storage
    if (selectedStorage.length > 0) {
      tabletResults = tabletResults.filter((tablet) => tablet.storage && selectedStorage.includes(tablet.storage))
    }

    setFilteredTablets(tabletResults)

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
    setFilteredTablets(tablets)
    setFilteredAccessories(accessories)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl bold font-bold mb-6">Shop Phones</h1>
            <p className="text-xl regular text-gray-600">Browse our selection of new and certified refurbished phones.</p>
          </div>
        </div>
      </section>

      {/* Store Content */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
           

            {/* Products Grid */}
            <div className="lg:w-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">
                  {activeTab === "phones"
                    ? filteredPhones.length === phones.length
                      ? `All Phones (${phones.length})`
                      : `Filtered Phones (${filteredPhones.length})`
                    : activeTab === "tablets"
                      ? filteredTablets.length === tablets.length
                        ? `All Tablets (${tablets.length})`
                        : `Filtered Tablets (${filteredTablets.length})`
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
                            <Button variant="link" className="mt-4 ">
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
                                  className="object-contain p-2"
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
                                const message = `Hie RepaieBox I want to buy these products:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}`

                                // Create WhatsApp URL with the message
                                const whatsappUrl = `https://wa.me/263779286308?text=${encodeURIComponent(message)}`

                                // Open WhatsApp in a new tab
                                window.open(whatsappUrl, "_blank")
                              }}
                            >
                              Checkout via WhatsApp
                            </Button>
                            <SheetClose asChild>
                            <Button variant="link" className="mt-4 w-full border  ">
                              Continue Shopping
                            </Button>
                          </SheetClose>
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

              {/* Tabs for Phones, Tablets and Accessories */}
              <Tabs defaultValue="phones" className="mb-8" onValueChange={(value) => setActiveTab(value)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="phones">All Phones</TabsTrigger>
                  <TabsTrigger value="tablets">Tablets</TabsTrigger>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                </TabsList>

                {/* Phones Tab Content */}
                <TabsContent value="phones" className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredPhones.map((phone) => (
                    <div
                    key={phone.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full"
                    >
                    <div className="relative h-48 w-full">
                      <Image
                      src={phone.image || "/placeholder.svg"}
                      alt={phone.name}
                      fill
                      className="object-contain p-4"
                      />
                      {phone.condition === "Refurbished" && (
                      <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                        Refurbished
                      </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 break-words">{phone.name}</h3>
                      <p className="text-gray-500 mb-2">
                      {phone.storage ? `${phone.storage}, ` : ""}
                      {phone.brand}
                      </p>
                      <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold">${phone.price.toFixed(2)}</span>
                      <Button 
                        size="sm" 
                        className="flex items-center bg-[#FF7E23] gap-1 text-sm" 
                        onClick={() => addPhoneToCart(phone)}
                      >
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

                {/* Tablets Tab Content */}
                <TabsContent value="tablets">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTablets.map((tablet) => (
                      <div
                        key={tablet.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image
                          src={tablet.image || "/placeholder.svg"}
                          alt={tablet.name}
                          fill
                          className="object-contain p-4"
                          />
                          {tablet.condition === "Refurbished" && (
                          <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                            Refurbished
                          </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">{tablet.name}</h3>
                          <p className="text-gray-500 mb-2">
                            {tablet.storage ? `${tablet.storage}, ` : ""}
                            {tablet.brand}
                          </p>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold">${tablet.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="flex bg-[#FF7E23] items-center gap-1"
                              onClick={() => addTabletToCart(tablet)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => setSelectedTablet(tablet)}
                          >
                            View More Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Accessories Tab Content */}
                <TabsContent value="accessories" className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredAccessories.map((accessory) => (
                      <div
                        key={accessory.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={accessory.image || "/placeholder.svg"}
                            alt={accessory.name}
                            fill
                            className="object-contain p-4"
                          />
                          <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                            {accessory.category}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1 break-words">{accessory.name}</h3>
                          <p className="text-gray-500 mb-2">{accessory.brand}</p>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold">${accessory.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="flex items-center bg-[#FF7E23] gap-1 text-sm"
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

      {/* Phone Details Modal */}
      {selectedPhone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto p-4 sm:p-6">
            <div className="relative h-64">
              <Image
              src={selectedPhone.image || "/placeholder.svg"}
              alt={selectedPhone.name}
              fill
              className="object-contain p-4"
              />
              {selectedPhone.condition === "Refurbished" && (
              <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                Refurbished
              </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{selectedPhone.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Brand</h3>
                  <p>{selectedPhone.brand}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Price</h3>
                  <p className="text-xl font-bold text-teal-600">${selectedPhone.price.toFixed(2)}</p>
                </div>
                {selectedPhone.storage && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Storage</h3>
                    <p>{selectedPhone.storage}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-700">Condition</h3>
                  <p>{selectedPhone.condition}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{selectedPhone.description}</p>
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
                  <li>High-resolution display</li>
                  <li>Powerful processor</li>
                  <li>Advanced camera system</li>
                  <li>Long battery life</li>
                  <li>Secure authentication</li>
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
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto p-4 sm:p-6">
            <div className="relative h-64">
              <Image
              src={selectedAccessory.image || "/placeholder.svg"}
              alt={selectedAccessory.name}
              fill
              className="object-contain p-4"
              />
              <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
              {selectedAccessory.category}
              </span>
            </div>
            <div className="p-4">
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

              {/* Only show compatibility for relevant accessory categories */}
              {["Charger", "Earbuds", "Case", "Power Bank", "Adapter", "Car Accessory"].includes(
                selectedAccessory.category,
              ) && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Compatible With</h3>
                  <p className="text-gray-600">
                    Compatible with most modern smartphones including iPhone and Android devices.
                  </p>
                </div>
              )}

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

      {/* Tablet Details Modal */}
      {selectedTablet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="relative h-64">
              <Image
              src={selectedTablet.image || "/placeholder.svg"}
              alt={selectedTablet.name}
              fill
              className="object-contain p-4"
              />
              {selectedTablet.condition === "Refurbished" && (
              <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                Refurbished
              </span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedTablet.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Brand</h3>
                  <p>{selectedTablet.brand}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Price</h3>
                  <p className="text-xl font-bold text-teal-600">${selectedTablet.price.toFixed(2)}</p>
                </div>
                {selectedTablet.storage && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Storage</h3>
                    <p>{selectedTablet.storage}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-700">Condition</h3>
                  <p>{selectedTablet.condition}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{selectedTablet.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>High-resolution display for crisp visuals</li>
                  <li>Long-lasting battery for extended use</li>
                  <li>Fast processor for smooth performance</li>
                  <li>Expandable storage options</li>
                  <li>Lightweight and portable design</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    addTabletToCart(selectedTablet)
                    setSelectedTablet(null)
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => setSelectedTablet(null)}>
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
