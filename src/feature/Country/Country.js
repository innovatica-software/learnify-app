import React, { useEffect, useState } from "react";
import "./Country.css";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../state/reducers/country/countrySlice";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
const Country = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  const { isLoading, countries } = useSelector((state) => state.countries);
  const [visible, setVisible] = useState(4);
  const loadMore = () => {
    setVisible(visible + 4);
  };

  return (
    <div className="country-section">
      <div className="lg:flex justify-center items-center gap-16 w-3/4 mx-auto md:pt-20">
        <div className="w-full ">
          <h1 className="text-xl lg:text-4xl xl:text-5xl text-start">
            Which language do you want to try ?
          </h1>

          {isLoading ? (
            <div className="w-1/4 mx-auto mt-12">
              <Loader></Loader>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 md:w-3/4 ">
              {countries.slice(0, visible).map((country) => (
                <Link
                  to={`/country/${country.countryId}`}
                  key={country.countryId}
                  className="country-card mt-4 w-full border"
                >
                  <img
                    src={country.flag}
                    alt={country.language}
                    className="h-6 w-6 rounded-full"
                  />
                  <h3 className="font-bold">{country.language}</h3>
                </Link>
              ))}
              <button
                onClick={loadMore}
                className={
                  countries?.length > visible
                    ? "bg-white h-12 w-full mt-4 border rounded font-bold flex justify-center items-center gap-2 "
                    : "hidden "
                }
              >
                {" "}
                <FiPlusCircle className="text-xl font-bold" /> MORE
              </button>
            </div>
          )}
        </div>
        <div className="w-full mt-4">
          <img
            src="https://www.babbel.com/static/index_page/en_US/images/hero-large-en.4ea397b62160120f1e32.webp"
            alt=""
            className="max-h-96 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Country;
