"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    device: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the form data into a message
    const message = `
*Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service Needed:* ${formData.service}
*Device Model:* ${formData.device}
*Message:* ${formData.message}
  `

    // Create WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/263779286308?text=${encodeURIComponent(message)}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Reset the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      device: "",
      message: "",
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">Have a question or need to book a repair? We're here to help.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="h-10 w-10 text-teal-600" />,
                title: "Our Location",
                details: ["123 Repair Street", "Tech City, TC 12345"],
              },
              {
                icon: <Phone className="h-10 w-10 text-teal-600" />,
                title: "Phone Number",
                details: ["(123) 456-7890", "(123) 456-7891"],
              },
              {
                icon: <Mail className="h-10 w-10 text-teal-600" />,
                title: "Email Address",
                details: ["info@repairbox.com", "support@repairbox.com"],
              },
              {
                icon: <Clock className="h-10 w-10 text-teal-600" />,
                title: "Working Hours",
                details: ["Mon-Fri: 9AM - 7PM", "Sat: 10AM - 5PM", "Sun: Closed"],
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="inline-block mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Needed
                    </label>
                    <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="screen">Screen Replacement</SelectItem>
                        <SelectItem value="battery">Battery Replacement</SelectItem>
                        <SelectItem value="water">Water Damage Repair</SelectItem>
                        <SelectItem value="camera">Camera Repair</SelectItem>
                        <SelectItem value="software">Software Issues</SelectItem>
                        <SelectItem value="unlocking">Phone Unlocking</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1">
                    Device Model
                  </label>
                  <Input
                    id="device"
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    placeholder="iPhone 13, Samsung Galaxy S21, etc."
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe the issue you're experiencing..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map would be embedded here</p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Visit Our Store</h3>
                <p className="text-gray-600 mb-4">
                  We're conveniently located in the heart of Tech City. Stop by during our business hours for immediate
                  assistance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Address:</h4>
                    <p className="text-gray-600">123 Repair Street</p>
                    <p className="text-gray-600">Tech City, TC 12345</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Hours:</h4>
                    <p className="text-gray-600">Monday-Friday: 9AM - 7PM</p>
                    <p className="text-gray-600">Saturday: 10AM - 5PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our repair services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long does a typical repair take?",
                answer:
                  "Most repairs are completed within 1-2 hours. More complex issues like water damage may take 24-48 hours.",
              },
              {
                question: "Do you offer a warranty on repairs?",
                answer:
                  "Yes, all our repairs come with a 90-day warranty. If you experience any issues with our repair, bring it back and we'll fix it for free.",
              },
              {
                question: "Do I need to make an appointment?",
                answer:
                  "While appointments are recommended to ensure prompt service, we also accept walk-ins. You can book an appointment online or by phone.",
              },
              {
                question: "What brands do you repair?",
                answer:
                  "We repair all major phone brands including Apple, Samsung, Google, Huawei, Xiaomi, OnePlus, and more.",
              },
              {
                question: "Do you offer data recovery services?",
                answer:
                  "Yes, we offer data recovery services for phones with software or hardware issues. Our technicians can help recover your photos, contacts, and other important data.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Your Phone Fixed?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a repair appointment today or visit our store for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
              Call Us: (123) 456-7890
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
