import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className=" align-center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 md:py-24 lg:grid lg:min-h-[70vh] lg:grid-cols-2 lg:place-content-center lg:gap-12 lg:px-8">
        <div className="pt-10 max-w-xl space-y-5">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            All Your Digital Products
            <span className="block text-primary">Is One Click Away</span>
          </h1>

          <p className="text-lg text-gray-600 sm:text-xl">
            Start exploring state-of-the-art assets now and take your creativity to the next level.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="inline-block rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Get Started
            </Link>
            <Link
              href="#about-us"
              className="inline-block rounded-lg border border-primary px-6 py-3 text-base font-semibold text-primary shadow-sm transition hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* الصورة */}
        <div className="relative mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            alt="About us"
            className="w-full h-[350px] sm:h-[400px] lg:h-[500px] rounded-3xl object-cover shadow-lg"
          />
          <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-4 rounded-xl shadow-xl">
            <span className="block text-3xl font-bold">10+</span>
            <p className="text-sm opacity-90">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
