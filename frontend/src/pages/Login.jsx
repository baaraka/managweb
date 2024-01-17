import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);

      // login successful, navigate to the login page
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className="h-screen bg-blue-100 flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-bold">Login Here...</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

        <button type="submit" className="py-2 px-4 bg-blue-300 rounded-md">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <p>
          Don't have account? {""}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
