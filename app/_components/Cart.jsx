'use client';
import React, { useContext, useState } from 'react';
import { CartContext } from '../_context/CartContext';
import Link from 'next/link';

function Cart() {
  const { cart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(true);

  return (
    openCart && (
      <div
        className="h-[300px] w-[300px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <button
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          onClick={() => setOpenCart(false)}
        >
          <span className="sr-only">Close cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            {cart?.length > 0 ? (
              cart.map(item => {
                const product = item?.product;
                return (
                  <li
                    key={item?.id || product?.id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={product?.banner?.url || '/placeholder.png'}
                      alt={product?.title || 'Product image'}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-sm text-gray-900 line-clamp-1">
                        {product?.title || 'No title'}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Category:</dt>
                          <dd className="inline">
                            {' '}
                            {product?.category || 'N/A'}{' '}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inline">
                            {' '}
                            {product?.price ?? 'N/A'}{' '}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="text-sm text-gray-500">Your cart is empty</li>
            )}
          </ul>

          {/* Actions */}
          <div className="space-y-4 text-center">
            <Link
              href="/cart"
              className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            >
              View my cart ({cart?.length || 0})
            </Link>

            <Link
              href="/checkout"
              className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
              Checkout
            </Link>

            <button
              onClick={() => setOpenCart(false)}
              className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Cart;
