import React, { useEffect } from "react";
import { PiCoins } from "react-icons/pi";
import { theme } from "../../Theme/AppTheme";
import "./Premium.css";
import { api } from "./../../config/index";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetails } from "../../state/reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";
const PremiumCard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getStudentDetails(user.token));
    } else {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate, user.token]);
  const onSubmit = (data) => {
    console.log(data);
    fetch(`${api}/account/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.data);
      });
  };

  return (
    <div
      className="pt-12 md:pt-28 min-h-screen justify-center items-center"
      style={{ backgroundColor: `${theme.countryColor}` }}
    >
      <h1
        className="mb-16 text-center text-2xl "
        style={{ color: `${theme.textColor}` }}
      >
        Unlock Opportunities: Purchase Your Learning Coins Today!
      </h1>
      <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full lg:w-3/4 mx-auto">
        <div className="w-3/4 mx-auto md:w-full  border bg-white rounded-lg p-8">
          <span className="flex justify-center items-center gap-4">
            <h2 className="text-xl text-gray-900  text-center font-semibold ">
              300 Coins
            </h2>
            <PiCoins className="text-orange-500 text-2xl" />
          </span>
          <h2 className="text-4xl text-center plan-text-color font-semibold mt-8 mb-2">
            10Tk
          </h2>
          <p className="text-xl text-center plan-text-color font-semibold mt-8 mb-2">
            {" "}
          </p>

          <button
            className="w-full mx-auto plan-card mt-8 h-12 text-md text-white bg-teal-500 font-semibold rounded mb-12"
            onClick={() => onSubmit({ coin: 300, amount: 10 })}
          >
            Purchase Coin
          </button>
        </div>
        <div className="w-3/4 mx-auto md:w-full  border bg-white rounded-lg p-8">
          <span className="flex justify-center items-center gap-4">
            <h2 className="text-xl text-gray-900  text-center font-semibold ">
              1000 Coins
            </h2>
            <PiCoins className="text-orange-500 text-2xl" />
          </span>
          <h2 className="text-4xl text-center plan-text-color font-semibold mt-8 mb-2">
            30Tk
          </h2>
          <p className="text-xl text-center plan-text-color font-semibold mt-8 mb-2">
            {" "}
          </p>

          <button
            onClick={() => onSubmit({ coin: 1000, amount: 30 })}
            className="w-full  mx-auto plan-card mt-8 h-12 text-md text-white bg-teal-500 font-semibold rounded mb-12"
          >
            Purchase Coin
          </button>
        </div>
        <div className="w-3/4 mx-auto md:w-full  bg-white rounded-lg p-8">
          <span className="flex justify-center items-center gap-4">
            <h2 className="text-xl text-gray-900  text-center font-semibold ">
              1500 Coins
            </h2>
            <PiCoins className="text-orange-500 text-2xl" />
          </span>
          <h2 className="text-4xl text-center plan-text-color font-semibold mt-8 mb-2">
            40Tk
          </h2>
          <p className="text-xl text-center plan-text-color font-semibold mt-8 mb-2"></p>

          <button
            onClick={() => onSubmit({ coin: 1500, amount: 40 })}
            className="w-full mx-auto plan-card mt-8 h-12 text-md text-white bg-teal-500 font-semibold rounded mb-12"
          >
            Purchase Coin
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
