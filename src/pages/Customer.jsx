import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    customerId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Get customers from localStorage when the component mounts
    const storedCustomers = JSON.parse(localStorage.getItem("customers"));
    if (storedCustomers) {
      setCustomers(storedCustomers);
    }
  }, []);

  const resetForm = () => {
    setForm({
      customerId: "",
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newCustomers = [];
    if (editingIndex !== null) {
      // Edit the existing customer
      newCustomers = [...customers];
      newCustomers[editingIndex] = form;
    } else {
      // Add new customer
      newCustomers = [...customers, form];
    }

    // Save updated data to localStorage
    localStorage.setItem("customers", JSON.stringify(newCustomers));

    setCustomers(newCustomers);
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setForm(customers[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure to delete this customer?")) {
      const updated = customers.filter((_, i) => i !== index);
      // Save the updated data to localStorage
      localStorage.setItem("customers", JSON.stringify(updated));
      setCustomers(updated);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 py-6">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customers"]}>
        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Add Customer
        </button>
      </PageHeader>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Customer" : "Add New Customer"}
            </h2>
            <form onSubmit={handleSubmit}>
              {["customerId", "name", "email", "phone", "address"].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block mb-1 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
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

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="text-left px-6 py-3">Customer ID</th>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Phone</th>
              <th className="text-left px-6 py-3">Address</th>
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No customers found.
                </td>
              </tr>
            )}
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.customerId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{customer.customerId}</td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.address}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
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

export default Customers;
