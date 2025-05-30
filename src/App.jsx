<<<<<<< HEAD
import "./assets/tailwinds.css";
import React, { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
// import PageHeader from "./components/PageHeader";
// import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Users from "./pages/User";
// import Order from "./pages/Order";
// import Customer from "./pages/Customer";
// import NotFound from "./pages/NotFound";
// import ErrorPage from './pages/ErrorPage';
// import MainLayout from "./layout/MainLayout";
// import AuthLayout from "./layout/AuthLayout";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import Forgot from "./pages/Auth/Forgot";
import Products from "./pages/Products";

const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const Order = React.lazy(() => import("./pages/Order"));
const Customer = React.lazy(() => import("./pages/Customer"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const MainLayout = React.lazy(() => import("./layout/MainLayout"));
const AuthLayout = React.lazy(() => import("./layout/AuthLayout"));


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Order />} />
          <Route path="customers" element={<Customer />} />
          <Route path="users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        {/* Error pages – DI LUAR MainLayout agar full screen */}
        <Route path="/error/400" element={<ErrorPage code={400} />} />
        <Route path="/error/401" element={<ErrorPage code={401} />} />
        <Route path="/error/403" element={<ErrorPage code={403} />} />
        <Route path="*" element={<ErrorPage code={404} />} />

        {/* Auth Layout */}
        <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> f1ed2b10e5dd4f9db566d8d791c4bae1b3dd227b
