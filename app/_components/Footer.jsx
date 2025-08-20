'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAuthPage(pathname.includes('sign-in') || pathname.includes('sign-up'));
  }, [pathname]);

  if (!mounted) return null;
  return (
    !isAuthPage && (
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
            <div>
              <Image src="/logo.svg" alt="logo" width={50} height={50} className='pb-5' />
              <p className="text-sm leading-6">
                We provide top educational services and training courses to help
                you develop your skills and achieve your personal and
                professional goals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/courses" className="hover:text-white">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="/#about-us" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li>1-on-1 Coaching</li>
                <li>Online Courses</li>
                <li>Professional Consulting</li>
                <li>Workshops</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <Facebook />
                </a>
                <a href="#" className="hover:text-white">
                  <Twitter />
                </a>
                <a href="#" className="hover:text-white">
                  <Instagram />
                </a>
                <a href="#" className="hover:text-white">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
