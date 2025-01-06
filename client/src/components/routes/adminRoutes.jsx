
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import axios from "axios";
import Spinner from "../spinner.jsx";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();
  // axios.defaults.headers.common['Authorization'] = auth?.token;

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/admin-auth",{}, {headers: {
          Authorization: auth?.token
        }});
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
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
        // toast.error("Authentication check failed");
        // console.error("Authentication check failed:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner page={"home"} />;
};

export default AdminRoute;
