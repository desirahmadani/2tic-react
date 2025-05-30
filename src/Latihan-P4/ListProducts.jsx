import React, { useState, useEffect } from 'react';
import products from './products.json';

const ListProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait for 500ms after the user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-pink-600">Product List</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between bg-white"
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="mt-4">
                <p className="text-base font-bold text-pink-600">
                  ${product.price.toFixed(2)}{" "}
                  <span className="line-through text-gray-400 text-sm">
                    {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
                <p className="text-sm text-green-600">{product.stock} in stock</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProduct;
