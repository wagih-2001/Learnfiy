'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Have any questions or want to collaborate? We’re here to help. Fill
          out the form below or reach us directly.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white shadow-lg rounded-2xl p-8 text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <Mail className="text-primary w-6 h-6" />
                <span className="text-gray-700">info@techedu.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-primary w-6 h-6" />
                <span className="text-gray-700">+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-primary w-6 h-6" />
                <span className="text-gray-700">123 Tech Street, NY</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a message
            </h3>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-primary"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-primary"
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
