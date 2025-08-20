'use client';

import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../_context/CartContext';
import Swal from 'sweetalert2';
import productApi from '../_Utils/ListProduct';
import cartApis from '../_Utils/cartApis';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

export default function Courses() {
  const [products, setProducts] = useState([]);
  const { setCart } = useContext(CartContext);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    productApi.getLatestProduct().then(res => {
      setProducts(res?.data?.data || []);
    });
  }, []);

  const handelAddToCart = (product) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    const data = {
      data: {
        username: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        products: [product.documentId]
      }
    };

    console.log('Adding product to cart:', product);

    cartApis
      .AddToCart(data)
      .then(res => {
        console.log('Cart API response:', res?.data);

        setCart(oldCart => [
          ...oldCart,
          {
            id: product.documentId,
            product
          }
        ]);

        Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: `${product.title} has been added to your cart.`,
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-gray-800">
        Explore <span className="text-primary">Courses</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(p => {
          const imgUrl = p?.banner?.url;
          return (
            <div
              key={p.documentId}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={p.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => router.push(`/product-details/${p.documentId}`)}
                  />
                )}
                <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  ${p.price}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between h-44">
                <h2
                  className="text-lg font-semibold line-clamp-2 text-gray-800 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => router.push(`/product-details/${p.documentId}`)}
                >
                  {p.title}
                </h2>

                <button
                  onClick={() => handelAddToCart(p)}
                  className="mt-4 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
