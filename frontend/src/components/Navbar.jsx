import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);

  const handleSideBarClose = () => {
    setShow(false);
  };

  return (
    <div className="p-7 flex items-center justify-between">
      <h1 className="text-3xl font-bold">webApp</h1>
      <div className="hidden md:flex items-center gap-5">
        <Link to="/">
          <p className="text-xl">Home</p>
        </Link>
        <Link to="/add">
          <p className="text-xl">Add</p>
        </Link>
      </div>
      {!currentUser ? (
        <div className="flex gap-5 items-center">
          <Link to="/login">
            <button className="hidden md:flex text-xl border px-2 py-1 rounded-lg">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="hidden md:flex text-xl border px-2 py-1 rounded-lg">
              Register
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <p className="text-lg font-semibold">{currentUser.username}</p>
          <p className="text-xl cursor-pointer font-bold" onClick={logout}>
            Logout
          </p>
        </div>
      )}
      {!open ? (
        <Bars3Icon
          className="relative md:hidden h-6 w-6 cursor-pointer"
          onClick={() => {
            setShow(!show);
            setOpen(true);
          }}
        />
      ) : (
        <XMarkIcon
          className="relative md:hidden h-6 w-6 cursor-pointer"
          onClick={() => {
            setShow(!show);
            setOpen(false);
          }}
        />
      )}
      {show && (
        <div className="absolute h-screen w-screen top-[100px]  right-0 items-center justify-center bg-white flex flex-col gap-5">
          <Link to="/">
            <p className="text-xl" onClick={handleSideBarClose}>
              Home
            </p>
          </Link>
          <Link to="/add">
            <p className="text-xl" onClick={handleSideBarClose}>
              Add
            </p>
          </Link>

          {!currentUser ? (
            <div className="flex flex-col gap-5 items-center">
              <Link to="/login">
                <button
                  className="md:hidden text-xl border px-2 py-1 rounded-lg"
                  onClick={handleSideBarClose}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="md:hidden text-xl border px-2 py-1 rounded-lg"
                  onClick={handleSideBarClose}
                >
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5 items-center">
              <p className="text-lg font-semibold">{currentUser.username}</p>
              <p
                className="text-xl cursor-pointer font-bold"
                onClick={() => {
                  logout();
                  handleSideBarClose();
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
