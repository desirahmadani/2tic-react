import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Products() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const breadcrumb = ["Dashboard", "Product List"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/products/search?q=${query}`)
        .then((response) => setProducts(response.data.products))
        .catch((err) => console.error("Error fetching products:", err));
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div>
      <PageHeader title="Products" breadcrumb={breadcrumb} />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
        className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg"
      />

      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-emerald-600 text-white text-left text-sm font-semibold">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Vendor</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {products.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 font-medium text-gray-700">
                {index + 1}.
              </td>
              <td className="px-6 py-4">
                <Link
                  to={`/products/${item.id}`}
                  className="text-emerald-400 hover:text-emeraldQ-500"
                >
                  {item.title}
                </Link>
              </td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">Rp {item.price * 1000}</td>
              <td className="px-6 py-4">{item.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
