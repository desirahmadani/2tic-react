import React from 'react';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate untuk navigasi

export default function ErrorPage({ code }) {
  const navigate = useNavigate(); // Hook untuk navigasi programatik

  const errorConfig = {
    400: {
      message: "Bad Request",
      imageUrl: "https://www.prontomarketing.com/wp-content/uploads/2022/12/how-to-fix-400-bad-requst-error-wordpress.png",
    },
    401: {
      message: "Unauthorized",
      imageUrl: "https://www.bluehost.in/blog/wp-content/uploads/2023/06/what-is-a-401-error.png",
    },
    403: {
      message: "Forbidden",
      imageUrl: "https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden-HTML.png",
    },
    404: {
      message: "Page Not Found",
      imageUrl: "https://www.hostinger.co.uk/tutorials/wp-content/uploads/sites/2/2020/08/404-not-found-hero.jpg",
    },
  };

  const error = errorConfig[code] || errorConfig[404];

  // Fungsi untuk navigasi kembali ke halaman dashboard
  const goToDashboard = () => {
    navigate('/'); // Navigasi ke halaman utama (dashboard)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-center">
        <img src={error.imageUrl} alt={`Error ${code}`} className="w-full max-w-3xl mx-auto mb-6" />
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">{`Error ${code}`}</h1>
        <p className="text-3xl text-gray-700 mb-6">{error.message}</p>
        <p className="text-xl text-gray-500 mb-6">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        {/* Button untuk kembali ke dashboard */}
        <button
          onClick={goToDashboard}
          className="mt-6 py-3 px-6 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-800"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
