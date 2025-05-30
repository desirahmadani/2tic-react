// src/components/PageHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            {/* Kiri: Judul dan Breadcrumb */}
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <span key={index} className="text-gray-500">
                                {item}
                                {index < breadcrumb.length - 1 && <span className="text-gray-500">/</span>}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500">{breadcrumb}</span>
                    )}
                </div>
            </div>

            {/* Kanan: Action Button */}
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}
