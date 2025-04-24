"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from '../public/logo.png'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
      <div className="flex w-3 ">
        <Link href="/" className="flex w-/2 items-center ">
        {/* <Phone className="h-6 w-6 text-teal-600" /> */}
        <Image src={logo} alt="" className="w-[90%]"/>
        <span className="text-xl font-bold">RepairBox</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-teal-600">
        Home
        </Link>
        <Link href="/about" className="text-sm font-medium transition-colors hover:text-teal-600">
        About Us
        </Link>
        <Link href="/services" className="text-sm font-medium transition-colors hover:text-teal-600">
        Our Services
        </Link>
        <Link href="/store" className="text-sm font-medium transition-colors hover:text-teal-600">
        Store
        </Link>
        <Link href="/repairs" className="text-sm font-medium transition-colors hover:text-teal-600">
        Repairs
        </Link>
        <Link href="/contact" className="text-sm font-medium transition-colors hover:text-teal-600">
        Contact Us
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/store" className="hidden md:flex">
        <Button variant="outline" size="icon">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Shopping cart</span>
        </Button>
        </Link>
        <Link href="/contact" className="hidden md:flex">
        <Button>Book Repair</Button>
        </Link>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
      <div className="fixed inset-0 z-50 bg-red-600 md:hidden">
        <div className="container flex h-16 items-center bg-white justify-between">
        <div className="flex items-center bg-white gap-2">
          <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="" className="w-[20%]"/>
          <span className="text-xl font-bold">RepairBox</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
        </div>
        <nav className="container grid gap-6 py-6 bg-white">
        <Link href="/" className="text-lg bg-white font-medium" onClick={toggleMenu}>
          Home
        </Link>
        <Link href="/about" className="text-lg bg-white  font-medium" onClick={toggleMenu}>
          About Us
        </Link>
        <Link href="/services" className="text-lg bg-white  font-medium" onClick={toggleMenu}>
          Our Services
        </Link>
        <Link href="/store" className="text-lg bg-white  font-medium" onClick={toggleMenu}>
          Store
        </Link>
        <Link href="/repairs" className="text-lg  bg-white font-medium" onClick={toggleMenu}>
          Repairs
        </Link>
        <Link href="/contact" className="text-lg bg-white  font-medium" onClick={toggleMenu}>
          Contact Us
        </Link>
        <div className="flex flex-col gap-4 pt-4">
          <Link href="/store" onClick={toggleMenu}>
          <Button variant="outline" className="w-full justify-start gap-2">
            <ShoppingBag className="h-5 w-5" />
            Store
          </Button>
          </Link>
          <Link href="/contact" onClick={toggleMenu}>
          <Button className="w-full">Book Repair</Button>
          </Link>
        </div>
        </nav>
      </div>
      )}
    </header>
  )
}
