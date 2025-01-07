import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import Facebook from "../../assets/svg/Facebook.svg";
import Google from "../../assets/svg/google.svg";
import Insta from "../../assets/svg/insta.svg";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, watch, trigger,reset } = useForm();
  const { auth, setAuth } = useAuth();
  const [step, setStep] = useState(1);
  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");
  const password = watch("password");

  const navigate = useNavigate();
  const location = useLocation();
  const gotoLastSite = location.state?.from?.endsWith('/login') || location.state?.from?.endsWith('/register')
  ? "/"
  : (location.state?.from || "/");
  const handleNext = async () => {
    const isPhoneValid = await trigger("phone");
    const isEmailValid = await trigger("email");
    const isNameValid = await trigger("name");
    const isPasswordValid = await trigger("password");
    if (!isPhoneValid || !isEmailValid || !isNameValid || !isPasswordValid) {
      alert("recheck the fields")
      return;
    }
    setStep(2);
  };


  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/register', data);
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedAuth = { ...auth, user: res.data.user, token: res.data.token }
        setAuth(updatedAuth);
        // Save auth data to localStorage
        localStorage.setItem("auth", JSON.stringify(updatedAuth));

        // Retrieve the path to redirect to after signup
        setTimeout(() => {
          navigate(gotoLastSite); // Redirect to the last visited page
        }, 1000);
        reset();
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  };

  return (
    <Layout>
      <div className="container flex justify-center items-center h-full w-full">
        <div className="auth-container relative flex w-1/2 border-2 border-black rounded-3xl h-3/4 overflow-hidden">
          {/* Right Section (Toggle Info) */}
          <div className="auth-right absolute top-0 left-0 h-full w-[45%] rounded-r-[25%] flex flex-col gap-4 items-center justify-center bg-black text-white">
            <div className="text-3xl">Welcome Back!</div>
            <div className="text-center">Login to access your account</div>
            <Link to='/login' className='border-white border-2 px-5 py-1 rounded-xl'>Sign In</Link>
          </div>
          {/* Left Section (Form) */}
          <div className="auth-left absolute top-0 right-0 h-full w-[55%] flex flex-col gap-4 items-center justify-center">
            <div className="text-4xl">Sign Up</div>
            {/* <div className="flex justify-center items-center gap-2">
              <img className="h-8" src={Facebook} alt="Facebook" />
              <img className="h-8" src={Google} alt="Google" />
              <img className="h-8" src={Insta} alt="Instagram" />
            </div> */}
            <div className="text-center">Register with your details</div>

            <form className="flex w-[200%] overflow-hidden " onKeyDown={(e) => {
              if (step === 1 && e.key === 'Tab') {
                e.preventDefault();
              }
            }} onSubmit={handleSubmit(onSubmit)}>
              {/* First part of the form */}
              <div
                className={`flex flex-col items-center transition-all w-full duration-500 ease-in-out ${step === 1 ? 'translate-x-[50%]' : '-translate-x-full'}`}
              >
                <div className="flex w-full items-center flex-col h-14">
                  <input
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    placeholder="Username"
                    {...register("name", { required: "This field is required" })}
                  />
                  {errors.name && <div className="text-red-600 text-sm">{errors.name.message}</div>}
                </div>
                <div className="flex w-full items-center flex-col h-14">
                  <input
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    placeholder="Phone Number"
                    type="text"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Phone number must contain only numbers",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number cannot exceed 10 digits",
                      },
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                      },
                    })}
                  />
                  {errors.phone && <div className="text-red-600 text-sm">{errors.phone.message}</div>}
                </div>
                <div className="flex w-full items-center flex-col h-14">
                  <input
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
                </div>
                <div className="flex w-full items-center flex-col h-14">
                  <input
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    placeholder="Set Password"
                    type="password"
                    {...register("password", { required: "This field is required" })}
                  />
                  {errors.password && <div className="text-red-600 text-sm">{errors.password.message}</div>}
                </div>
                <button
                  type="button"
                  className="font-bold text-lg w-4/6 flex justify-center"
                  onClick={handleNext} // On click, go to the second part
                  disabled={isSubmitting}
                >
                  Next
                </button>
              </div>

              {/* Second part of the form */}
              <div
                className={`flex flex-col  transition-all w-full items-center duration-500 ease-in-out ${step === 2 ? '-translate-x-[50%]' : 'translate-x-full'}`}
              >
                <div className="flex w-full items-center flex-col h-14">
                  <select
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    {...register("setHint", { required: "This field is required" })}
                  >
                    <option value="">Select hint</option>
                    <option value="Favorite Sport">Favorite Sport</option>
                    <option value="Favorite Movie">Favorite Movie</option>
                    <option value="Best Friend's Name">Best Friend's Name</option>
                  </select>
                  {errors.setHint && <div className="text-red-600 text-sm">{errors.setHint.message}</div>}
                </div>


                <div className="flex w-full items-center flex-col h-14">
                  <input
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    placeholder="Set hint"
                    type="text"
                    {...register("hint", { required: "This field is required" })}
                  />
                  {errors.hint && <div className="text-red-600 text-sm">{errors.hint.message}</div>}
                </div>
                <div className="flex w-full items-center flex-col h-14">
                  <input
                    className="text-center w-4/6 h-9 border-2 border-black rounded-md"
                    placeholder="Address"
                    type="text"
                    {...register("address", { required: "This field is required" })}
                  />
                  {errors.address && <div className="text-red-600 text-sm">{errors.address.message}</div>}
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="font-bold text-lg"
                    onClick={() => setStep(1)} // On click, go to the second part
                  >
                    Back
                  </button>
                  <input
                    disabled={isSubmitting}
                    className="font-bold text-lg"
                    type="submit"
                    value={isSubmitting ? 'Registering...' : 'Sign Up'}
                  />
                </div>
              </div>
            </form>
          </div>


        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
