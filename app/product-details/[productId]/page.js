'use client';
import ProductInfo from './_component/ProductInfo.jsx';
import ProductBanner from './_component/ProductBanner';
import Breadcrumb from '../../_components/Breadcrumb';
import productApi from '../../_Utils/ListProduct.js';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProductList from '../../_components/ProductList';

function ProductDetails() {
  const path = usePathname();

  const [productDetails, setproductDetails] = useState({});
  const [productList, setproductList] = useState([]);

  const params = useParams();

  useEffect(() => {
    getProductById_();
  }, [params.productId]);

  const getProductById_ = () => {
    productApi.getProductById(params.productId).then(res => {
      setproductDetails(res?.data?.data[0]);
      getProductListtByCategory(res.data.data[0]);
    });
  };

  const getProductListtByCategory = product => {
    productApi.getProductByCategory(product?.category).then(res => {
      setproductList(res.data.data);
    });
  };

  return (
    <div className="px-6 sm:px-12 md:px-28 py-10">
      <Breadcrumb path={path} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10 items-start">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 text-xl mb-4">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;
