import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Login from "./Login";

const Add = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/items/",
        {
          title,
          price,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setSuccessMessage("Item Added successfully");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);
      } else {
        console.error("unexpected response", res);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setErrorMessage("Error adding item. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {currentUser ? (
        <div className="h-screen bg-green-100 flex flex-col gap-5 items-center justify-center">
          <h1 className="text-3xl font-bold">Add Item....</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="title of task"
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 px-4 rounded-lg outline-none text-gray-500 shadow-md"
              required
            />

            <input
              type="number"
              placeholder="task price"
              onChange={(e) => setPrice(e.target.value)}
              required
              className="py-2 px-4 rounded-lg outline-none text-gray-500 shadow-md"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-green-300 rounded-md shadow-md"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>

            {successMessage && (
              <p className="text-lg font-light text-green-500">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className="text-lg font-light text-red-500">{errorMessage}</p>
            )}

            <Link to="/" className="text-blue-500 underline">
              Back to home page
            </Link>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Add;
