'use client';

import { AlertCircleIcon, BadgeCheck, ShoppingCart } from 'lucide-react';
import SkeletonLoading from './SkeletonLoading';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import cartApis from '../../../_Utils/cartApis';
import { useContext, useState } from 'react';
import { CartContext } from '../../../_context/CartContext';

function ProductInfo({ product }) {
  const { setCart } = useContext(CartContext);
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    setLoading(true);

    const data = {
      data: {
        username: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        products: [product?.id]
      }
    };

    cartApis
      .AddToCart(data)
      .then(res => {
        setCart(oldCart => [
          ...oldCart,
          { id: product?.id }
        ]);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  if (!product?.id) {
    return <SkeletonLoading />;
  }

  return (
    <div>
      <div className="w-full px-4 sm:px-10 py-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product?.title}
          </h1>
          <p className="text-sm text-gray-400 mt-1">{product?.category}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {product?.description?.[0]?.children?.[0]?.text}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          {product?.instantDelivery ? (
            <BadgeCheck className="text-green-500 w-4 h-4" />
          ) : (
            <AlertCircleIcon className="text-red-500 w-4 h-4" />
          )}
          <span>Eligible For Instant Delivery</span>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-primary text-center sm:text-left">
            ${product?.price}
          </h2>

          <button
            onClick={handleAddToCart}
            disabled={loading} 
            className={`flex items-center justify-center gap-2 rounded-lg ${
              loading ? 'bg-gray-400' : 'bg-primary hover:bg-primaryHover'
            } text-white py-2 px-4 transition-all duration-200`}
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                Loading...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add To Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
