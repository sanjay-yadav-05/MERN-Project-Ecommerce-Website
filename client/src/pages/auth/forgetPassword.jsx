import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
  const [setHint, setSetHint] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordRequest = async (data) => {
    if (data.email) {
      try {
        const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', { email: data.email });
        if (res.data.success) {
          setSetHint(res.data.setHint);
          toast.success(res.data.message);
          setForgotPasswordStep(2);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch set hint");
      }
    }
  };

  const handleVerifyHint = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/verify-hint', { email:data.email, hint: data.hintAnswer });
      if (res.data.success) {
        toast.success("Hint verified. Proceed to reset your password.");
        setForgotPasswordStep(3);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to verify hint");
    }
  };

  const handleResetPassword = async (data) => {
    if (data.newPassword === data.confirmPassword) {
      try {
        const res = await axios.post('http://localhost:8080/api/v1/auth/reset-password', { email:data.email, newPassword: data.newPassword });
        if (res.data.success) {
          toast.success("Password updated successfully. Please log in.");
          reset();
          setTimeout(() => {
            setForgotPasswordStep(0);
            navigate("/login");
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Failed to reset password");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <Layout>
      <div className="container flex justify-center items-center h-full w-full">
        <div className="auth-container relative flex w-1/2 border-2 border-black rounded-3xl h-3/4 overflow-hidden">
          {forgotPasswordStep === 0 && (
            <div className="auth-left w-full h-full flex flex-col gap-4 items-center justify-center">
              <div className="text-4xl">Forgot Password</div>
              <div className="text-center">Enter your email to retrieve your hint</div>
              <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(handleForgotPasswordRequest)}>
                <div className="flex items-center flex-col h-14">
                  <input
                    type="email"
                    className="text-center w-3/6 h-9 border-2 border-black rounded-md"
                    placeholder="email"
                    {...register("email", { required: "This field is required" })}
                  />
                  {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
                </div>
                <button type="submit" className="font-bold text-lg">
                  Submit
                </button>
              </form>
            </div>
          )}

          {forgotPasswordStep === 2 && (
            <div className="auth-left w-full h-full flex flex-col gap-4 items-center justify-center">
              <div className="text-4xl">Verify Hint</div>
              <div className="text-center">Hint: {setHint}</div>
              <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(handleVerifyHint)}>
                <div className="flex items-center w-full justify-center flex-col h-14">
                  <input
                    className="text-center w-3/6 h-9 border-2 border-black rounded-md"
                    placeholder="Enter hint answer"
                    {...register("hintAnswer", { required: "This field is required" })}
                  />
                  {errors.hintAnswer && <div className="text-red-600 text-sm">{errors.hintAnswer.message}</div>}
                </div>
                <input className="font-bold text-lg" type="submit" value="Verify" />
              </form>
            </div>
          )}

          {forgotPasswordStep === 3 && (
            <div className="auth-left w-full h-full flex flex-col gap-4 items-center justify-center">
              <div className="text-4xl">Reset Password</div>
              <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(handleResetPassword)}>
                <div className="flex items-center flex-col h-14">
                  <input
                    className="text-center w-3/6 h-9 border-2 border-black rounded-md"
                    placeholder="New Password"
                    type="password"
                    {...register("newPassword", { required: "This field is required" })}
                  />
                  {errors.newPassword && <div className="text-red-600 text-sm">{errors.newPassword.message}</div>}
                </div>
                <div className="flex items-center flex-col h-14">
                  <input
                    className="text-center w-3/6 h-9 border-2 border-black rounded-md"
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword", { required: "This field is required" })}
                  />
                  {errors.confirmPassword && <div className="text-red-600 text-sm">{errors.confirmPassword.message}</div>}
                </div>
                <input className="font-bold text-lg" type="submit" value="Reset Password" />
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
