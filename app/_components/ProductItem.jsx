import { Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product.documentId}`}
      className="group block"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

        <div className="relative">
          <Image
            src={product?.banner?.url}
            alt={product?.title}
            width={400}
            height={300}
            className="h-[230px] w-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col justify-between h-[120px]">
          <h2 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {product?.title}
          </h2>

          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Tag className="w-4 h-4 text-primary" />
              {product?.category}
            </div>
            <span className="text-primary font-semibold">
              ${product?.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
