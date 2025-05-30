// src/pages/Customer.jsx
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';  // Pastikan pathnya benar

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    return (
        <div>
            <PageHeader 
                title="Customers" 
                breadcrumb={["Home", "Customers"]} 
            >
                {/* Tambahkan tombol atau komponen lain jika diperlukan */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                    Add Customer
                </button>
            </PageHeader>

            {/* Konten halaman Customers */}
            <div className="mt-4">
                {/* Daftar customers */}
            </div>
        </div>
    );
}

export default Customers;
