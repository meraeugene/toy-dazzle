import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  toggleEditQuantity,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const { itemsPrice, subtotal, shippingPrice, totalPrice } = useSelector(
    (state) => state.cart
  );

  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle change in payment option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const increaseQuantityHandler = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const decreaseQuantityHandler = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const toggleEditQuantityHandler = (id) => {
    dispatch(toggleEditQuantity({ id }));
  };

  const handleCheckoutHandler = () => {
    if (!selectedOption) {
      return toast.error("Please select payment option");
    } else if (selectedOption === "Gcash") {
      return toast.error("Gcash is not available");
    }

    navigate(`/checkout?mop=${selectedOption}`);
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="px-40 lg:px-16 2xl:px-40 py-10 flex  gap-8 bg-gray-200">
          <div className="cartItems flex flex-col gap-8  h-full  py-0 pb-0  basis-[70%] ">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-8 bg-white rounded-2xl px-6 py-2 "
              >
                <div className="img__container basis-full  2xl:basis-[60%] ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className=""
                    loading="lazy"
                  />
                </div>
                <div className="content basis-full  ">
                  <h1 className="fredoka 2xl:text-2xl text-xl  font-semibold">
                    {item.name}
                  </h1>

                  <div className=" mt-4">
                    <div className="flex items-center gap-8 outfit font-bold  ">
                      <span className="text-lg  font-semibold   w-[30%] xl:w-[25%]">
                        Price:
                      </span>{" "}
                      <h3 className="text-lg text-[#FA6A02] ">
                        {item.price?.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </h3>
                    </div>
                    <div className=" outfit font-bold  2xl:mt-4 mt-4">
                      {item.isEditing ? (
                        <div className="flex items-center">
                          <span className="text-lg font-semibold    w-[40%] 2xl:w-[30%] xl:w-[35%]">
                            Quantity:
                          </span>{" "}
                          <button
                            onClick={() => decreaseQuantityHandler(item.id)}
                            className="border text-[#fa6a02] border-[#FA6A02] w-[40px] h-[40px] font-semibold  flex items-center justify-center rounded-tl-2xl rounded-bl-2xl"
                          >
                            <FaMinus />
                          </button>
                          <span className="border-[#FA6A02] border w-[50px] h-[40px] flex items-center justify-center border-r-0 border-l-0 font-semibold text-xl ">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantityHandler(item.id)}
                            className="border flex items-center justify-center text-[#fa6a02] border-[#FA6A02] w-[40px] h-[40px] font-semibold  rounded-tr-2xl rounded-br-2xl"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-8 outfit font-bold  lg:mt-0 ">
                          <span className="text-lg font-semibold    w-[30%] xl:w-[25%]">
                            Quantity:
                          </span>{" "}
                          <h1 className="text-lg">{item.quantity}</h1>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col mt-4 2xl:mt-8   items-start">
                      <button
                        onClick={() => toggleEditQuantityHandler(item.id)}
                        className="text-[#49B449] text-lg font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeFromCartHandler(item.id)}
                        className="text-[#E0301E] text-lg font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout basis-[50%] 2xl:basis-[30%] h-full bg-white shadow-md  py-6 pb-8  rounded-2xl lg:p-4 2xl:p-8">
            <h1 className="fredoka text-xl xl:text-xl font-semibold 2xl:text-2xl">
              How you'll pay
            </h1>
            <div className="flex flex-col gap-1 mt-2">
              <label className="flex items-center gap-2 fredoka">
                <input
                  type="radio"
                  value="Cash on delivery"
                  name="paymentOption"
                  checked={selectedOption === "Cash on delivery"}
                  onChange={handleOptionChange}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 fredoka">
                <input
                  type="radio"
                  name="paymentOption"
                  value="Gcash"
                  onChange={handleOptionChange}
                />
                Gcash
              </label>
            </div>
            <div className="total-payment__container mt-4">
              <div className="flex items-center gap-8 outfit font-bold  ">
                <span className="2xl:text-xl  text-lg  xl:text-lg  lg:w-[50%] w-[35%]">
                  Item/s total:
                </span>{" "}
                <h3 className="2xl:text-xl xl:text-lg text-lg  ">
                  {itemsPrice?.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <div className="flex items-center gap-8 outfit font-bold  ">
                <span className="2xl:text-xl  xl:text-lg  text-lg  lg:w-[50%]">
                  Shop Discount:
                </span>{" "}
                <h3 className="2xl:text-xl xl:text-lg text-lg  text-[#E0301E] ">
                  {(250).toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <div className="border my-4 border-gray-400" />

              <div className="flex items-center gap-8 outfit font-bold  ">
                <span className="2xl:text-xl xl:text-lg   text-lg  lg:w-[50%]">
                  Subtotal:{" "}
                </span>{" "}
                <h3 className="2xl:text-xl xl:text-lg text-lg  ">
                  {subtotal?.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <div className="flex items-center gap-8 outfit font-bold">
                <span className="2xl:text-xl text-lg xl:text-lg  lg:w-[50%]">
                  Shipping Fee:
                </span>
                <h3 className="2xl:text-xl xl:text-lg text-lg">
                  {shippingPrice === 0 ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    shippingPrice?.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-8 outfit font-bold  ">
                <span className=" xl:text-lg  2xl:text-xl text-lg  lg:w-[50%]">
                  Total Item({cartItems.length}):
                </span>{" "}
                <h3 className="2xl:text-xl xl:text-lg  text-lg text-[#FA6A02] ">
                  {totalPrice?.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <button
                onClick={handleCheckoutHandler}
                className="bg-[#FA6A02] lg:text-lg font-semibold h-[55px]  rounded-full fredoka text-white lg:mt-6 w-full 2xl:text-2xl xl:text-xl "
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <img src="/images/icons/emptycart.webp" alt="" loading="lazy" />
          <h1 className="outfit text-3xl mt-6 font-semibold">
            Your Cart is Empty
          </h1>
          <Link
            to="/"
            className="lg:w-[35%] xl:w-[30%] 2xl:w-[25%] fredoka  mt-8 text-3xl font-medium bg-[#FA6A02] text-white h-[60px] flex items-center justify-center"
          >
            Shop our Products Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
