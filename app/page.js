'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Hero from './_components/Hero';
import ProductSection from './_components/ProductSection';
import Category from './_components/Category';
import AboutUs from './_components/AboutUs';
import ContactUs from './_components/ContactUs';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo.svg"
            alt="svg"
            width={80}
            height={80}
            className="animate-bounce"
          />
          <p className="text-gray-500 text-sm animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <Category/>
      <ProductSection />
      <AboutUs />
      <ContactUs />
    </div>
  );
}
