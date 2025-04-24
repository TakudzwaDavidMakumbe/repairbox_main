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

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-600">Professional phone repair services for all major brands and models.</p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: <Smartphone className="h-10 w-10 text-[#FF9E00]" />,
                title: "Screen Replacement",
                description:
                  "Cracked or broken screen? We'll replace it with a high-quality display that matches your phone's original specifications.",
                  image: img,
              },
              {
                icon: <Battery className="h-10 w-10 text-[#FF9E00]" />,
                title: "Battery Replacement",
                description:
                  "Is your phone not holding a charge? Our battery replacement service will restore your phone's battery life to like-new condition.",
                  image: img1,
              },
              {
                icon: <Droplet className="h-10 w-10 text-[#FF9E00]" />,
                title: "Water Damage Repair",
                description:
                  "Dropped your phone in water? Our experts can help recover your device and prevent long-term damage with our specialized equipment.",
                  image: img2,
              },
              {
                icon: <Camera className="h-10 w-10 text-[#FF9E00]" />,
                title: "Camera Repair",
                description:
                  "Having issues with your phone's camera? We can diagnose and fix camera problems to get you back to taking great photos.",
                  image: img3,
              },
              {
                icon: <Cpu className="h-10 w-10 text-[#FF9E00]" />,
                title: "Software Issues",
                description:
                  "Experiencing software glitches, freezing, or other software-related problems? Our technicians can help resolve these issues.",
                  image: img4,
              },
              {
                icon: <Lock className="h-10 w-10 text-[#FF9E00]" />,
                title: "Phone Unlocking",
                description:
                  "Want to use your phone with a different carrier? We can unlock your phone to work with any carrier worldwide.",
                  image: img5,
              },
            ].map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2 relative h-[200px] w-full rounded-lg overflow-hidden">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon}
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex  gap-4">
                  <Link href="/contact">
                    <Button className="w-[90%]">Book This Service</Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-[90%] bg-[#FF9E00]">Get a Quote</Button>
                  </Link>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Brands We Service</h2>
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

      {/* How It Works */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our repair process is simple, transparent, and designed to get your device back to you as quickly as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Book an Appointment",
                description: "Schedule a repair appointment online or by phone. Walk-ins are also welcome.",
              },
              {
                step: 2,
                title: "Diagnosis & Quote",
                description: "Our technicians will diagnose the issue and provide you with a transparent quote.",
              },
              {
                step: 3,
                title: "Quick Repair & Pickup",
                description: "We'll repair your device, often while you wait, and you can pick it up good as new.",
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
