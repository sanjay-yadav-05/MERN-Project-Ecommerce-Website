import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './layout';
import { useAuth } from '../context/authContext';
const Spinner = () => {
    const [count, setCount] = useState(2);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => prevValue - 1);
        }, 1000);

        // Navigate to login when count reaches 0
        if (count === 0) {
            navigate(auth && auth.user?.role === 0 ? "/" : "/login", { state: { from: location.pathname } });
        }

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <Layout>
            <div className="flex flex-col gap-4 justify-center items-center h-full">
                <h1 className='text-3xl' >Redirecting you to {auth?.user? (auth?.user?.role === 1 ? "dashboard" : "home") : "login"} in {count} seconds...</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </Layout>
    );
};

export default Spinner;
