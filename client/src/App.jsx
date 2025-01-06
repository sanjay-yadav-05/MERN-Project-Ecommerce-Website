import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Policy from './pages/policy';
import PageNotFound from './pages/pageNotFound';
import Singup from './pages/auth/singup.jsx';
import Login from './pages/auth/login.jsx';
import Dashboard from './pages/users/dashboard.jsx'
import PrivateRoute from './components/routes/privateRoute';
// import Layout from './components/layout.jsx';
import { Routes, Route } from 'react-router-dom';
import ForgetPassword from './pages/auth/forgetPassword.jsx';
import AdminRoute from './components/routes/adminRoutes';
import AdminDashboard from './pages/admin/adminDashBoard.jsx';
import CreateCategory from './pages/admin/createCategory';
import CreateProduct from './pages/admin/createProduct';
import AllUsersInfo from './pages/admin/allUsersInfo';
import Cart from './pages/users/cart';
import AllOrders from './pages/users/allOrders';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/register" element={<Singup />} />
      <Route path="/dashboard" element={<PrivateRoute />} >
        <Route path="user/profile" element={<Dashboard />} />
        <Route path="user/all-orders" element={<AllOrders />} />
        <Route path="user/cart" element={<Cart />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />} >
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/all-users" element={<AllUsersInfo />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
