import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="h-screen bg-blue-300 flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-bold">Register Here</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          className="py-2 px-4 rounded-lg outline-none text-gray-500 shadow-md"
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          className="py-2 px-4 rounded-lg outline-none text-gray-500 shadow-md"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          className="py-2 px-4 rounded-lg outline-none text-gray-500 shadow-md"
        />

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 rounded-md shadow-md"
        >
          Register
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <p>
          Do you have account? {""}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
