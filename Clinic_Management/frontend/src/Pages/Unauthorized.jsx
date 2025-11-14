import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Unauthorized Access
            </h2>
            <p className="text-gray-600 mb-6">
                You don't have permission to view this page.
            </p>
            <button
                onClick={() => navigate("/")}
                className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default Unauthorized;
