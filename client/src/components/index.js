import React from "react";
import {
  Home,
  WishList,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
  PageNotFound,
} from "./shop";

import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";

import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Routing All page will be here */
const Rout = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shop & Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/products/category/:catId"
          element={<ProductByCategory />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/dashboard/categories" element={<Categories />} />
        <Route path="/admin/dashboard/products" element={<Products />} />
        <Route path="/admin/dashboard/orders" element={<Orders />} />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/setting" element={<SettingUser />} />
        {/* User Dashboard End */}

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rout;
