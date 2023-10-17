import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import "./App.css"

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import StorePage from "./pages/Store";
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/SignupLoginPage"
import CollectionPage from "./pages/CollectionPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/Order";
import ProfilePage from "./pages/ProfilePage"

import AdminDashboard from "./pages/Admin/AdminDashboard";

import ProductAddingPage from "./pages/Admin/ProductAddingPage";

import { ContProvider, useCont } from "./context/MyContext";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <ContProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>

            <Route path="/" element={<Home />} /> 
            <Route path="/product" element={<ProductPage />} /> 
            <Route path="/store" element={<StorePage />} /> 
            <Route path="/collections" element={<CollectionPage />} /> 
            <Route path="/about-us" element={<ProductPage />} /> 
            <Route path="/contact-us" element={<ProductPage />} /> 
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/orders/:orderId" element={<OrderPage />} /> 
            <Route path="/profile" element={<ProfilePage />} /> 

            <Route path="/signup" element={<SignupPage />} /> 
            <Route path="/login" element={<LoginPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products-adding" element={<ProductAddingPage />} />

          </Routes>
          <Footer /> 
        </BrowserRouter>
      </AuthProvider>
    </ContProvider>
  );
}

export default App;