import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext.jsx";
import Facebook from "../../assets/svg/Facebook.svg";
import Google from "../../assets/svg/google.svg";
import Insta from "../../assets/svg/insta.svg";
import { useCart } from "../../context/cartContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const gotoLastSite = location.state?.from?.endsWith('login') || location.state?.from?.endsWith('register')
    ? "/"
    : (location.state?.from || "/");

  const onSubmitLogin = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      
      if (res.data.success) {
        toast.success(`${res.data.user.name} logged in successfully`);
        const updatedAuth = { ...auth, user: res.data.user, token: res.data.token };
        setAuth(updatedAuth);
        setCart(updatedAuth.user.cart);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
        localStorage.setItem("cart", JSON.stringify(updatedAuth.user.cart));
        setTimeout(() => navigate(gotoLastSite), 1000);
        reset();
      } else {
        // Handle backend failure messages
        toast.error(res.data.message);
      }
    } catch (error) {
      // Check if the error has a response (indicates server responded with a status code)
      if (error.response) {
        // Display the error message from the backend
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else went wrong
        toast.error("Something went wrong");
      }
      console.error(error.message);
    }
    
  };

  return (
    <Layout>
      <div className="container flex justify-center items-center h-full w-full">
        <div className="auth-container relative flex w-1/2 border-2 border-black rounded-3xl h-3/4 overflow-hidden">
          <div className="auth-left absolute top-0 h-full w-[55%] flex flex-col gap-4 items-center justify-center">
            <div className="text-4xl">Sign In</div>
            <div className="flex justify-center items-center gap-2">
              <img className="h-8" src={Facebook} alt="Facebook" />
              <img className="h-8" src={Google} alt="Google" />
              <img className="h-8" src={Insta} alt="Instagram" />
            </div>
            <div className="text-center">Use your email and password</div>
            <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="flex items-center flex-col h-14">
                <input
                  type="email"
                  className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                  placeholder="email"
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
              </div>
              <div className="flex items-center flex-col h-14">
                <input
                  className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                  placeholder="password"
                  type="password"
                  {...register("password", { required: "This field is required" })}
                />
                {errors.password && <div className="text-red-600 text-sm">{errors.password.message}</div>}
              </div>
              <input
                disabled={isSubmitting}
                className="font-bold text-lg"
                type="submit"
                value={isSubmitting ? 'Loging in...' : 'Login'}
              />
              <Link to="/forgetPassword" className="text-center text-sm">Forgot password?</Link>
            </form>
          </div>
          <div className="auth-right absolute top-0 right-0 h-full w-[45%] flex flex-col gap-4 items-center justify-center rounded-l-[25%] bg-black text-white">
            <div className="text-3xl">Hello, Friend!</div>
            <div className="text-center">Register to use all features</div>
            <Link to="/register" className="border-white border-2 px-5 py-1 rounded-xl">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
