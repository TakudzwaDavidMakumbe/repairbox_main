import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Smartphone, Battery, Droplet, Camera, Cpu, Lock, CheckCircle, Clock, DollarSign } from "lucide-react"
import img from  '../../public/6.png'
import img1 from  '../../public/4.png'
import img2 from  '../../public/11.png'
import img3 from  '../../public/8.png'
import img4 from  '../../public/17.png'
import img5 from  '../../public/3.png'
import imgg1 from '../../public/test.jpg'
import imgg2 from '../../public/test1.jpg'
import imgg3 from '../../public/test3.jpg'

export default function RepairsPage() {
  // Sample repair services
  const repairServices = [
    {
      id: 1,
      title: "Screen Replacement",
      icon: <Smartphone className="h-10 w-10 text-[#FF9E00]" />,
      description: "Fix cracked or broken screens with high-quality replacement parts.",
      price: "From $79",
      time: "1-2 hours",
      image: img,
    },
    {
      id: 2,
      title: "Battery Replacement",
      icon: <Battery className="h-10 w-10 text-[#FF9E00]" />,
      description: "Restore your phone's battery life with a new battery.",
      price: "From $49",
      time: "30-60 minutes",
      image: img1,
    },
    {
      id: 3,
      title: "Water Damage Repair",
      icon: <Droplet className="h-10 w-10 text-[#FF9E00]" />,
      description: "Recover your device from water damage and prevent long-term issues.",
      price: "From $99",
      time: "24-48 hours",
      image: img2,
    },
    {
      id: 4,
      title: "Camera Repair",
      icon: <Camera className="h-10 w-10 text-[#FF9E00]" />,
      description: "Fix front or rear camera issues to get back to taking great photos.",
      price: "From $69",
      time: "1-2 hours",
      image: img3,
    },
    {
      id: 5,
      title: "Software Issues",
      icon: <Cpu className="h-10 w-10 text-[#FF9E00]" />,
      description: "Resolve software glitches, freezing, or other software-related problems.",
      price: "From $39",
      time: "30-60 minutes",
      image: img4,
    },
    {
      id: 6,
      title: "Phone Unlocking",
      icon: <Lock className="h-10 w-10 text-[#FF9E00]" />,
      description: "Unlock your phone to use with any carrier worldwide.",
      price: "From $29",
      time: "15-30 minutes",
      image: img5,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Phone Repair Services</h1>
            <p className="text-xl text-gray-600">Professional repairs for all major phone brands and models.</p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Book a Repair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Repair Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of repair services to fix any issue with your phone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repairServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image 
                  src={service.image || "/placeholder.svg"} 
                  alt={service.title} 
                  fill 
                  className="object-contain w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon}
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span>{service.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>{service.time}</span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button className="w-full">Book This Repair</Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full bg-[#FF9E00] mt-2">Get a Quote </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Repair */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Brands We Repair</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We repair all major phone brands and models, including:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {["Apple", "Samsung", "Google", "Huawei", "Xiaomi", "OnePlus"].map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
                <span className="text-xl font-semibold">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Repair Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our repair process is simple, transparent, and designed to get your device back to you as quickly as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Book an Appointment",
                description: "Schedule a repair appointment online or by phone. Walk-ins are also welcome.",
              },
              {
                step: 2,
                title: "Diagnosis",
                description: "Our technicians will diagnose the issue with your device.",
              },
              {
                step: 3,
                title: "Repair",
                description: "We'll repair your device using high-quality parts and tools.",
              },
              {
                step: 4,
                title: "Pickup",
                description: "Pick up your device, good as new, often on the same day.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#FF9E00] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Repair Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality repairs and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="h-12 w-12 text-[#FF9E00]" />,
                title: "Quality Guarantee",
                description: "All repairs come with a 90-day warranty for your peace of mind.",
              },
              {
                icon: <Clock className="h-12 w-12 text-[#FF9E00]" />,
                title: "Quick Turnaround",
                description: "Most repairs are completed within 24 hours or less.",
              },
              {
                icon: <DollarSign className="h-12 w-12 text-[#FF9E00]" />,
                title: "Competitive Pricing",
                description: "Quality repairs at fair and transparent prices.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="inline-block mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
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
                Image: imgg1,
              },
              {
                name: "Michael Chen",
                text: "I bought a refurbished phone from RepairBox and couldn't be happier. It works perfectly and saved me hundreds compared to buying new.",
                Image: imgg2,
              },
              {
                name: "Emily Rodriguez",
                text: "After my phone got water damage, I thought it was gone for good. The team at RepairBox recovered all my data and fixed the phone. Amazing service!",
                Image: imgg3,
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
            Book a repair appointment today and get your device back to perfect working condition.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
              Book a Repair Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
