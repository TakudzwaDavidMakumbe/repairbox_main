import Image from "next/image"
import { Award, Users, Clock, CheckCircle } from "lucide-react"
import img from '../../public/test2.jpg'
import img1 from '../../public/test.jpg'
import img2 from '../../public/test1.jpg'
import img3 from '../../public/test3.jpg'
import logo from '../../public/2.jpg'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About RepairBox</h1>
            <p className="text-xl text-gray-600">
              We're passionate about technology and committed to providing the best phone repair and sales experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
              RepairBox specializes in fast, friendly, and professional repair services for mobile devices (smartphones, tablets, iPads), laptops & notebooks, audio & speaker systems, and small appliances. We also offer a range of consumer electronics and accessories.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a passion project by our founder, who was frustrated with the lack of reliable repair
                options, has grown into a trusted name in the industry.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of customers each year, helping them extend the life of their
                devices and offering quality phones at competitive prices.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src={logo}
                alt="RepairBox store"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">
              To provide expert phone repair services and quality devices that enhance our customers' lives, all
              delivered with exceptional service and integrity.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To be the most trusted name in phone repairs and sales, known for our expertise, quality, and
                  customer-first approach.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                <p className="text-gray-600">
                Fast: Same-day repairs (next-day at worst), Friendly & Professional: Honest, knowledgeable, and helpful service ,Transparent: Free diagnostics with custom quotes and clear, reliable solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of certified technicians and customer service professionals are dedicated to providing you with
              the best experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Smith", role: "Founder & CEO", img: img1 },
              { name: "Sarah Johnson", role: "Head Technician", img: img2 },
              { name: "Michael Chen", role: "Store Manager", img: img3 },
              { name: "Emily Rodriguez", role: "Customer Service Lead", img: img },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RepairBox</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality repairs and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Award className="h-12 w-12 text-[#FF6A00]" />,
                title: "Certified Technicians",
                description:
                  "Our repair technicians are certified and highly trained to handle all types of phone repairs.",
              },
              {
                icon: <Users className="h-12 w-12 text-[#FF6A00]" />,
                title: "Customer-First Approach",
                description: "We prioritize your needs and ensure you're satisfied with our services.",
              },
              {
                icon: <Clock className="h-12 w-12 text-[#FF6A00]" />,
                title: "Quick Turnaround",
                description:
                  "Most repairs are completed within 24 hours or less, so you're not without your device for long.",
              },
              {
                icon: <CheckCircle className="h-12 w-12 text-[#FF6A00]" />,
                title: "Quality Guarantee",
                description: "All repairs come with a 90-day warranty for your peace of mind.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex gap-6 p-6 bg-white rounded-lg shadow-md">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
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
    </>
  )
}
