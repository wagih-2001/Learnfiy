'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Megaphone, Cpu, ShieldCheck, Users } from 'lucide-react';
import productApi from '../_Utils/ListProduct';

const icons = {
  Marketing: <Megaphone className="w-6 h-6" />,
  Tech: <Cpu className="w-6 h-6" />,
  Security: <ShieldCheck className="w-6 h-6" />,
  'Soft Skills': <Users className="w-6 h-6" />
};

const colors = {
  Marketing: 'bg-yellow-100 text-yellow-600',
  Tech: 'bg-blue-100 text-blue-600',
  Security: 'bg-green-100 text-green-600',
  'Soft Skills': 'bg-purple-100 text-purple-600'
};

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const router = useRouter();

  const toggleCategory = index => {
    setOpenCategory(openCategory === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryNames = ['MARKETING', 'TECH', 'SECURITY', 'SOFT SKILLS'];

      const formatName = name => {
        switch (name) {
          case 'MARKETING':
            return 'Marketing';
          case 'TECH':
            return 'Tech';
          case 'SECURITY':
            return 'Security';
          case 'SOFT SKILLS':
            return 'Soft Skills';
          default:
            return name;
        }
      };

      const result = await Promise.all(
        categoryNames.map(async cat => {
          const res = await productApi.getProductByCategory(cat);

          const displayName = formatName(cat);

          return {
            name: displayName,
            icon: icons[displayName],
            color: colors[displayName],
            products:
              res.data?.data?.map(p => ({
                id: p.id,
                documentId: p.documentId,
                title: p.title,
                price: p.price,
                banner: p.banner?.url || null,
                category: p.category
              })) || []
          };
        })
      );

      setCategories(result);
    };

    fetchData();
  }, []);

  return (
    <section className=" max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Explore <span className="text-primary">Categories</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className={`rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition border ${category.color}`}
            onClick={() => toggleCategory(index)}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white p-3 rounded-full shadow">
                {category.icon}
              </div>
              <span className="font-semibold">{category.name}</span>
            </div>
          </div>
        ))}
      </div>

      {openCategory !== null && (
        <div className="mt-10">
          <h3 className=" text-primary text-2xl font-semibold mb-6 text-center">
            {categories[openCategory]?.name}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories[openCategory]?.products.length > 0 ? (
              categories[openCategory].products.map(product => (
                <div
                  key={product.documentId}
                  onClick={() =>
                    router.push(`/product-details/${product.documentId}`)
                  }
                  className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col"
                >
                  {product.banner && (
                    <Image
                      src={product.banner}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="rounded-t-lg object-cover w-full h-48"
                    />
                  )}
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {product.title}
                      </h3>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-full ${
                          colors[product.category] ||
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {product.category}
                      </span>
                    </div>
                    <p className="text-primary font-bold text-lg mt-3 text-right">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-gray-500 text-center py-4">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
