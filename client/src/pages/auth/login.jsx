// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Layout from "../../components/layout";
// import Facebook from "../../assets/svg/Facebook.svg";
// import Google from "../../assets/svg/google.svg";
// import Insta from "../../assets/svg/insta.svg";
// import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/authContext.jsx";

// const Login = () => {
//   const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
//   const { auth, setAuth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const gotoLastSite = location.state?.from?.endsWith('/login') || location.state?.from?.endsWith('/register')
//     ? "/"
//     : (location.state?.from || "/");
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(0); // Tracks steps for forgot password
//   const [setHint, setSetHint] = useState(""); // Stores the hint fetched from the backend
//   const [email, setEmail] = useState(""); // Stores the email for password reset

//   const onSubmitLogin = async (data) => {
//     try {
//       const res = await axios.post('http://localhost:8080/api/v1/auth/login', data);
//       if (res.data.success) {
//         toast.success(res.data.message);
//         const updatedAuth = { ...auth, user: res.data.user, token: res.data.token };
//         setAuth(updatedAuth);
//         localStorage.setItem("auth", JSON.stringify(updatedAuth));
//         setTimeout(() => navigate(gotoLastSite), 1000);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//       console.error(error.message);
//     }
//   };

//   const handleForgotPasswordRequest = async (e) => {
//     if (email) {
//       try {
//         const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', { email });
//         if (res.data.success) {
//           setSetHint(res.data.setHint);
//           toast.success(res.data.message);
//           setForgotPasswordStep(2);
//         } else {
//           toast.error(res.data.message);
//         }
//       } catch (error) {
//         toast.error("Failed to fetch set hint");
//       }
//     } else {
//       alert("Please enter email");

//     }

//   };

//   const handleVerifyHint = async (data) => {
//     try {
//       const res = await axios.post('http://localhost:8080/api/v1/auth/verify-hint', { email, hint: data.hintAnswer });
//       if (res.data.success) {
//         toast.success("Hint verified. Proceed to reset your password.");
//         setForgotPasswordStep(3);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to verify hint");
//     }
//   };

//   const handleResetPassword = async (data) => {
//     if (data.newPassword === data.confirmPassword) {
//       try {
//         const res = await axios.post('http://localhost:8080/api/v1/auth/reset-password', { email, newPassword: data.newPassword });
//         console.log(res.data);
//         if (res.data.success) {
//           toast.success("Password updated successfully. Please log in.");
//           setForgotPasswordStep(0); // Reset to login form
//           reset(); // Clear the form
//         } else {
//           toast.error(res.data.message);
//         }
//       } catch (error) {
//         toast.error("Failed to reset password");
//       }
//     }
//     else{
//       alert("Passwords do not match");
//     }
//   };

//   return (
//     <Layout>
//       <div className="container flex justify-center items-center h-full w-full">
//         <div className={`auth-container relative flex w-1/2 border-2 border-black rounded-3xl h-3/4 overflow-hidden `}>
//           {/* Left Section (Form) */}
//           {forgotPasswordStep === 0 && (
//             <div className={`auth-left absolute top-0 h-full w-[55%] flex flex-col gap-4 items-center transition-all  duration-500 ease-in-out justify-center ${forgotPasswordStep > 0 ? "-translate-x-full" : ""}`}>
//               <div className="text-4xl">Sign In</div>
//               <div className="flex justify-center items-center gap-2">
//                 <img className="h-8" src={Facebook} alt="Facebook" />
//                 <img className="h-8" src={Google} alt="Google" />
//                 <img className="h-8" src={Insta} alt="Instagram" />
//               </div>
//               <div className="text-center">Use your email and password</div>
//               <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(onSubmitLogin)}>
//                 <div className="flex items-center flex-col h-14">
//                   <input
//                     type="email"
//                     className="text-center w-4/6 h-9 border-2 border-black rounded-md"
//                     placeholder="email"
//                     {...register("email", { required: "This field is required" })}
//                   />
//                   {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
//                 </div>
//                 <div className="flex items-center flex-col h-14">
//                   <input
//                     className="text-center w-4/6 h-9 border-2 border-black rounded-md"
//                     placeholder="password"
//                     type="password"
//                     {...register("password", { required: "This field is required" })}
//                   />
//                   {errors.password && <div className="text-red-600 text-sm">{errors.password.message}</div>}
//                 </div>
//                 <input
//                   disabled={isSubmitting}
//                   className="font-bold text-lg"
//                   type="submit"
//                   value="Login"
//                 />
//                 <button onClick={() => setForgotPasswordStep(1)} className="text-center text-sm">
//                   Forgot password?
//                 </button>
//               </form>
//             </div>

//           )
//           }

//           {/* Forgot Password Step 1: Enter Email */}
//           {forgotPasswordStep === 1 && (
//             <div className="auth-left  w-full h-full flex flex-col gap-4 items-center justify-center">
//               <div className="text-4xl">Forgot Password</div>
//               <div className="text-center">Enter your email to retrieve your hint</div>
//               <div className="flex items-center w-3/6 justify-center flex-col h-10">
//                 <input
//                   type="email"
//                   className="text-center  w-full h-9 border-2 border-black rounded-md"
//                   placeholder="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <button onClick={handleForgotPasswordRequest} className="font-bold text-lg">
//                 Submit
//               </button>
//             </div>
//           )}

//           {/* Forgot Password Step 2: Verify Hint */}
//           {forgotPasswordStep === 2 && (
//             <div className="auth-left absolute top-0 h-full w-full flex flex-col gap-4 items-center justify-center">
//               <div className="text-4xl">Verify Hint</div>
//               <div className="text-center">Hint: {setHint}</div>
//               <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(handleVerifyHint)}>
//                 <div className="flex items-center w-full justify-center flex-col h-14">
//                   <input
//                     className="text-center w-3/6 h-9 border-2 border-black rounded-md"
//                     placeholder="Enter hint answer"
//                     {...register("hintAnswer", { required: "This field is required" })}
//                   />
//                   {errors.hintAnswer && <div className="text-red-600 text-sm">{errors.hintAnswer.message}</div>}
//                 </div>
//                 <input className="font-bold text-lg" type="submit" value="Verify" />
//               </form>
//             </div>
//           )}

//           {/* Forgot Password Step 3: Reset Password */}
//           {forgotPasswordStep === 3 && (
//             <div className="auth-left absolute top-0 h-full w-full flex flex-col gap-4 items-center justify-center">
//               <div className="text-4xl">Reset Password</div>
//               <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(handleResetPassword)}>
//                 <div className="flex items-center flex-col h-14">
//                   <input
//                     className="text-center w-3/6 h-9 border-2 border-black rounded-md"
//                     placeholder="New Password"
//                     type="password"
//                     {...register("newPassword", { required: "This field is required" })}
//                   />
//                   {errors.newPassword && <div className="text-red-600 text-sm">{errors.newPassword.message}</div>}
//                 </div>
//                 <div className="flex items-center flex-col h-14">
//                   <input
//                     className="text-center w-3/6 h-9 border-2 border-black rounded-md"
//                     placeholder="Confirm Password"
//                     type="password"
//                     {...register("confirmPassword", { required: "This field is required" })}
//                   />
//                   {errors.confirmPassword && <div className="text-red-600 text-sm">{errors.confirmPassword.message}</div>}
//                 </div>
//                 <input className="font-bold text-lg" type="submit" value="Reset Password" />
//               </form>
//             </div>
//           )}

//           {/* Right Section (Toggle Info) */}
//           {forgotPasswordStep === 0 && (<div className="auth-right absolute top-0 right-0 h-full w-[45%] flex flex-col gap-4 items-center justify-center rounded-l-[25%] bg-black text-white">
//             <div className="text-3xl">Hello, Friend!</div>
//             <div className="text-center">Register to use all features</div>
//             <Link to="/register" className="border-white border-2 px-5 py-1 rounded-xl">
//               Sign Up
//             </Link>
//           </div>)}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Login;
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

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const gotoLastSite = location.state?.from?.endsWith('/login') || location.state?.from?.endsWith('/register')
    ? "/"
    : (location.state?.from || "/");

  const onSubmitLogin = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedAuth = { ...auth, user: res.data.user, token: res.data.token };
        setAuth(updatedAuth);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
        setTimeout(() => navigate(gotoLastSite), 1000);
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
                value="Login"
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
