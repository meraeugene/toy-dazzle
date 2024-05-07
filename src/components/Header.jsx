import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { products } from "../data/products";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [loginNav, setLoginNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const activeClass = "text-[#FA6A02]";

  const Navlinks = [
    { navname: "Boys", to: "/categories/boys" },
    { navname: "Girls", to: "/categories/girls" },
    { navname: "Baby", to: "/categories/baby" },
    { navname: "Learning", to: "/categories/learning" },
    { navname: "Dress up", to: "/categories/dressup" },
    { navname: "Riding", to: "/categories/riding" },
    { navname: "Games", to: "/categories/games" },
  ];

  const filteredSearchData = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery))
    .slice(0, 5);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      try {
        const loginQuery = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(loginQuery, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setLoading(false);
          setUserData(user);
          window.location.reload();
        });
        setLoginNav(false);
        setLoading(false);
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("users");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  // logout function
  const logout = () => {
    localStorage.clear("users");
    setLoading(false);
    setLoginNav(false);
    window.location.reload();
  };

  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="sticky top-0 w-full z-30 ">
      <div className=" nav__container bg-[#007FFF] flex justify-between items-center 2xl:px-40 py-1 lg:px-16 ">
        <Link to="/" className="logo__container">
          <img
            src="/images/icons/logo.webp"
            alt=""
            width="150"
            loading="lazy"
          />
        </Link>
        <div className="search__container w-[500px] relative">
          <form className="flex items-center h-[40px]">
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-full w-full  outline-none px-2 border-r-0"
              value={searchQuery}
            />
            <button className="h-full bg-[#FA6A02]  w-[45px] flex items-center justify-center">
              <CiSearch size={22} color="white" />
            </button>
          </form>
          {searchQuery && (
            <div className="absolute border-t border w-full shadow-md bg-white  h-auto z-20">
              {filteredSearchData.map((product) => (
                <Link
                  to={`/product?id=${product.id}&name=${product.name}`}
                  key={product.id}
                  className="flex items-center gap-2 hover:bg-gray-200 p-2"
                  onClick={() => setSearchQuery("")}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[40px] "
                  />
                  <h1 className="fredoka  text-[16px]">{product.name}</h1>
                </Link>
              ))}
              {filteredSearchData.length === 0 && (
                <div className="flex items-center p-4 gap-2">
                  <CiSearch size={20} />
                  <p className="fredoka text-base ">
                    No results found. Try another search
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="cart-profile__container flex items-center gap-4">
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/cart"
            className="relative"
          >
            <RiShoppingCartLine size={26} color="white" />

            {cartItems.length > 0 && (
              <div className="absolute bg-[#FA6A02] text-white fredoka text-sm rounded-full w-[20px] h-[20px] flex items-center justify-center right-[-4px] top-[-7px]">
                {cartItems.length}
              </div>
            )}
          </Link>

          {loading ? (
            <l-tailspin
              size="20"
              stroke="3.5"
              speed="1"
              color="white"
            ></l-tailspin>
          ) : (
            <div className="relative">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setLoginNav((prev) => !prev);
                }}
              >
                <FaRegUserCircle size={26} color="white" />
              </div>
              {loginNav && (
                <div>
                  {userData && (
                    <div className="absolute z-10  border right-0 top-[56px]  w-[200px] shadow-md bg-white">
                      <div className="flex flex-col">
                        <Link
                          to="/profile"
                          onClick={() => setLoginNav(false)}
                          className="py-2 px-4 hover:bg-gray-200 outfit"
                        >
                          {userData.firstName.charAt(0).toUpperCase() +
                            userData.firstName.slice(1)}{" "}
                          {userData.lastName.charAt(0).toUpperCase() +
                            userData.lastName.slice(1)}
                        </Link>
                        <Link
                          to="/purchases"
                          onClick={() => setLoginNav(false)}
                          className="py-2 px-4 hover:bg-gray-200 outfit"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/reviews"
                          onClick={() => setLoginNav(false)}
                          className="py-2 px-4 hover:bg-gray-200 outfit"
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/help"
                          onClick={() => setLoginNav(false)}
                          className="py-2 px-4 hover:bg-gray-200 outfit"
                        >
                          Help
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setLoginNav(false)}
                          className="py-2 px-4 hover:bg-gray-200 outfit"
                        >
                          Settings
                        </Link>
                        <Link
                          className="py-2 px-4 hover:bg-gray-200 outfit"
                          onClick={logout}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                  {!userData && (
                    <div className="absolute z-10  border right-0 top-[56px] p-6 w-[400px] shadow-md bg-white">
                      <h1 className="text-center fredoka font-semibold text-2xl">
                        Login to my Account
                      </h1>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5 mt-6"
                      >
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            className={`${
                              errors.email ? "border-[2px] border-red-500" : ""
                            } border w-full border-[#FA6A02] px-4 rounded-2xl py-3 `}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address.",
                              },
                            })}
                          />
                          {errors.email && (
                            <div className="text-red-500 font-bold mt-2">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Password"
                            className={`${
                              errors.password
                                ? "border-[2px] border-red-500"
                                : ""
                            } border w-full border-[#FA6A02] px-4 rounded-2xl py-3 `}
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                          {errors.password && (
                            <div className="text-red-500 font-bold mt-2">
                              {errors.password.message}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-[#007FFF] px-4 h-[45px] border border-[#007FFF] shadow-md w-[120px] rounded-3xl font-bold text-[18px] text-white"
                          >
                            {isSubmitting ? (
                              <l-dot-pulse
                                size="38"
                                speed="1.3"
                                color="white"
                              ></l-dot-pulse>
                            ) : (
                              <span>Log in</span>
                            )}
                          </button>
                        </div>
                      </form>
                      <div className="text-center flex flex-col gap-1 mt-4">
                        <h3 className="outfit font-semibold">
                          New customer?
                          <Link
                            to="/auth/register"
                            onClick={() => {
                              setLoginNav((prev) => !prev);
                            }}
                            className="text-[#FA6A02]"
                          >
                            {" "}
                            Create an Account
                          </Link>
                        </h3>
                        <h3 className="outfit font-semibold">
                          Forgot Password?
                          <span className="text-[#FA6A02]">
                            {" "}
                            Recover Password
                          </span>
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white categories__container w-full shadow-md flex items-center justify-center gap-12 h-[50px]">
        {Navlinks.map((link, index) => (
          <NavLink
            key={index}
            exact="true"
            to={link.to}
            className={`cursor-pointer outfit font-semibold text-md hover:text-[#FA6A02] ${
              location.pathname === link.to ? activeClass : ""
            }`}
          >
            {link.navname}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Header;
