import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PaypalPayment from "./PaypalPayment";

const List = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutTaskId, setCheckoutTaskId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
        setError("Error fetching posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleAddTaskClick = (taskId) => {
    setCheckoutTaskId(taskId);
  };

  return (
    <div className="p-7 mt-7 flex flex-col gap-7">
      <h1 className="text-center text-2xl font-semibold">Task Lists</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <ClipLoader color="#4CAF50" loading={loading} size={50} />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          posts.map((post) => (
            <div
              className="flex flex-col gap-2 border p-4 shadow-lg rounded-md"
              key={post.id}
            >
              <h1 className="text-xl font-normal">{post.title}</h1>
              <p>
                Price <strong>${post.price}</strong>
              </p>
              {checkoutTaskId === post.id ? (
                <PaypalPayment />
              ) : (
                <button
                  className="py-2 px-4 bg-blue-100 max-w-max text-lg"
                  onClick={() => handleAddTaskClick(post.id)}
                >
                  Add Task
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
