import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-100">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-6 w-6 text-[#FF9E00]" />
              <span className="text-xl font-bold">RepairBox</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional phone sales and repair services. We fix what others can't.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#FF9E00]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF9E00]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF9E00]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF9E00]">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#FF9E00]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#FF9E00]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-[#FF9E00]">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="text-gray-400 hover:text-[#FF9E00]">
                  Repairs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#FF9E00]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Screen Replacement
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Battery Replacement
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Water Damage Repair
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Camera Repair
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Software Issues
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF9E00]">
                  Phone Unlocking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#FF9E00] mt-0.5" />
                <span className="text-gray-400">123 Repair Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#FF9E00]" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#FF9E00]" />
                <span className="text-gray-400">info@repairbox.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RepairBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
