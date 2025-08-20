import Image from 'next/image';
import React from 'react';

function ProductBanner({ product }) {
  return (
    <div>
      {product?.banner?.url ? (
        <Image
          src={product?.banner?.url}
          alt="Product-details-banner"
          width={400}
          height={400}
          className="rounded-lg"
        />
      ) : (
        <div className="w-[400px] h-[210px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
}

export default ProductBanner;
