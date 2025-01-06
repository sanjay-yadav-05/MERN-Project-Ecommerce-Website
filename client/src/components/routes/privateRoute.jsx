
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import axios from "axios";
import Spinner from "../spinner.jsx";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();
  // axios.defaults.headers.common['Authorization'] = auth?.token;

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/user-auth",{}, {headers: {
          Authorization: auth?.token
        }});
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        toast.error("Authentication check failed");
        console.error("Authentication check failed:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner page = {"login"} />;
};

export default PrivateRoute;
