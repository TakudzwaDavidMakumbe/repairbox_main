import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import img from '../public/iPhone-X.png'
import img1 from '../public/test.jpg'
import img2 from '../public/test1.jpg'
import img3 from '../public/test3.jpg'
import { Phone, Shield, Clock, Award, Smartphone, PenToolIcon as Tool, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#FF9E00] text-white">
        <div className="container flex flex-col md:flex-row items-center py-16 md:py-24">
          <div className="md:w-1/2 space-y-6 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Expert Phone Repairs & Quality Devices
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              We fix what others can't. Get your phone repaired by certified technicians or shop our selection of
              quality phones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/repairs">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Book a Repair
                </Button>
              </Link>
              <Link href="/store">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-black"
                >
                  Shop Phones
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
           
             <div className="relative regular">
            <div className="absolute -inset-4 bg-gradient-to-r bg-orange-500 to-orange-500 rounded-3xl opacity-30 blur-3xl"></div>
            <Image src={img} alt="iPhone X" className="relative w-full h-auto hover:scale-105 transition-transform duration-500" />
          </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From cracked screens to water damage, we provide comprehensive repair services for all major phone brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="h-10 w-10 text-[#FF9E00]" />,
                title: "Screen Replacement",
                description: "Cracked or broken screen? We'll replace it with a high-quality display.",
                
              },
              {
                icon: <Tool className="h-10 w-10 text-[#FF9E00]" />,
                title: "Battery Replacement",
                description: "Restore your phone's battery life with our professional replacement service.",
              },
              {
                icon: <Shield className="h-10 w-10 text-[#FF9E00]" />,
                title: "Water Damage Repair",
                description: "Dropped your phone in water? Our experts can help recover your device.",
              },
              {
                icon: <Phone className="h-10 w-10 text-[#FF9E00]" />,
                title: "Phone Unlocking",
                description: "Unlock your phone to use with any carrier worldwide.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-[#FF9E00]" />,
                title: "Data Recovery",
                description: "Lost important data? We can help recover photos, contacts, and more.",
              },
              {
                icon: <Smartphone className="h-10 w-10 text-[#FF9E00]" />,
                title: "Phone Sales",
                description: "Shop our selection of new and certified refurbished phones.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button>View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RepairBox</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality repairs and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-12 w-12 text-[#FF9E00]" />,
                title: "Certified Technicians",
                description: "Our repair technicians are certified and highly trained.",
                
              },
              {
                icon: <Shield className="h-12 w-12 text-[#FF9E00]" />,
                title: "Quality Guarantee",
                description: "All repairs come with a 90-day warranty for your peace of mind.",
              },
              {
                icon: <Clock className="h-12 w-12 text-[#FF9E00]" />,
                title: "Quick Turnaround",
                description: "Most repairs are completed within 24 hours or less.",
              },
              {
                icon: <CheckCircle className="h-12 w-12 text-[#FF9E00]" />,
                title: "Competitive Pricing",
                description: "Quality repairs at fair and transparent prices.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-block mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Phones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our selection of new and certified refurbished phones.
            </p>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[

              {
              model: "iPhone 14 Pro",
              storage: "256GB",
              price: 999.99,
              condition: "New, Unlocked",
              Image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-3.jpg",
              },
              {
              model: "Samsung Galaxy S24",
              storage: "128GB",
              price: 799.99,
              condition: "New, Unlocked",
              Image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a24-4g-2.jpg",
              },
              {
              model: "Samsung Galaxy A15",
              storage: "128GB",
              price: 599.99,
              condition: "Refurbished, Unlocked",
              Image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a15-lte-.jpg",

              },
              {
              model: "iPhone 13",
              storage: "128GB",
              price: 699.99,
              condition: "Refurbished, Unlocked",
              Image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg",
              }
            ].map((phone, index) => (
              <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                <Image
                src={phone.Image ?? '/placeholder.jpg'}
                alt={phone.model}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-contain"
                />
                </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{phone.model}</h3>
                <p className="text-gray-600 mb-2">{phone.storage}, {phone.condition}</p>
                <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${phone.price}</span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                </div>
              </div>
              </div>
            ))}
            </div>

          <div className="text-center mt-12">
            <Link href="/store">
              <Button>Shop All Phones</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "My screen was completely shattered, but RepairBox fixed it in just 2 hours! Looks brand new and the price was very reasonable.",
                Image: img1,
              },
              {
                name: "Michael Chen",
                text: "I bought a refurbished phone from RepairBox and couldn't be happier. It works perfectly and saved me hundreds compared to buying new.",
                Image: img2,
              },
              {
                name: "Emily Rodriguez",
                text: "After my phone got water damage, I thought it was gone for good. The team at RepairBox recovered all my data and fixed the phone. Amazing service!",
                Image: img3,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                    <Image src={testimonial.Image} alt="testimonial images" className="w-full h-full object-cover" />
                    </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF9E00] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Fix Your Phone?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a repair appointment today or visit our store to explore our phone selection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Book a Repair
              </Button>
            </Link>
            <Link href="/store">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-teal-600"
              >
                Shop Phones
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
