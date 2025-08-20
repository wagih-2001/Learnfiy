'use client';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import productApi from '../_Utils/ListProduct';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ProductSection = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProduct_();
  }, []);

  const getLatestProduct_ = () => {
    productApi.getLatestProduct().then(res => {
      setProductList(res.data.data);
    });
  };

  return (
    <section className="py-14 ">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Brand New
          </h2>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductList productList={productList} />
      </div>
    </section>
  );
};

export default ProductSection;
