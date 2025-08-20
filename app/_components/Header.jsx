'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs';
import { ShoppingCartIcon, X } from 'lucide-react';
import { CartContext } from '../_context/CartContext';
import cartApis from '../_Utils/cartApis';
import Cart from '../_components/Cart';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'About Us', path: '/#about-us' },
  { name: 'Contact Us', path: '/#contact' }
];

function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage =
    pathname.includes('sign-in') || pathname.includes('sign-up');

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getCartItems();
    }
  }, [user]);

  const getCartItems = () => {
    cartApis
      .getUserCartItem(user.primaryEmailAddress.emailAddress)
      .then(res => {
        const items = res?.data?.data || [];
        const updatedCart = items.map(citem => ({
          id: citem?.id,
          documentId: citem?.documentId,
          product: citem?.products?.[0] || {}
        }));
        setCart(updatedCart);
      });
  };
  

  return (
    !isAuthPage && (
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href={'/'}>
              <Image src="/logo.svg" alt="logo" width={50} height={50} />
            </Link>
            <Link href={'/'}>
              <span className="cursor-pointer font-bold text-lg hidden sm:block">
                Learnify{' '}
              </span>{' '}
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.path}
                    className="text-gray-500 transition hover:text-gray-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primaryHover">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setOpenCart(!openCart)}
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span className="text-sm">({cart?.length || 0})</span>
              </div>
              {openCart && <Cart />}
              <UserButton />
            </SignedIn>

            <button
              className="block rounded-sm bg-gray-100 p-2 text-gray-600 hover:text-gray-800 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
            <div className="bg-white w-64 p-6 flex flex-col gap-6">
              <button
                className="self-end text-gray-500 hover:text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <nav>
                <ul className="flex flex-col gap-4">
                  {navLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.path}
                        className="block text-gray-700 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          </div>
        )}
      </header>
    )
  );
}

export default Header;
