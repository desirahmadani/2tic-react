import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    orderId: "",
    customerName: "",
    status: "",
    totalPrice: "",
    orderDate: "",
  });

  // Reset the form data
  const resetForm = () => {
    setForm({
      orderId: "",
      customerName: "",
      status: "",
      totalPrice: "",
      orderDate: "",
    });
    setEditingIndex(null);
  };

  // Load orders from localStorage when the component mounts
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Save orders to localStorage whenever the orders list changes
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...orders];
      updated[editingIndex] = form;
      setOrders(updated);
    } else {
      setOrders([...orders, form]);
    }
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setForm(orders[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure to delete this order?")) {
      const updated = orders.filter((_, i) => i !== index);
      setOrders(updated);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 py-6">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Orders"]}>
        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Order
        </button>
      </PageHeader>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md"
        />
      </div>

      {/* Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Order" : "Add New Order"}
            </h2>
            <form onSubmit={handleSubmit}>
              {["orderId", "customerName", "totalPrice", "orderDate"].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type={field === "totalPrice" ? "number" : field === "orderDate" ? "date" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>
              ))}

              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="text-left px-6 py-3">Order ID</th>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Total</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
            {filteredOrders.map((order, index) => (
              <tr key={order.orderId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{order.orderId}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">${order.totalPrice}</td>
                <td className="px-6 py-4">{order.orderDate}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
