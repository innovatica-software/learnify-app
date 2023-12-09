import React, { useEffect, useState } from "react";
import "./Country.css";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../state/reducers/country/countrySlice";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const CountryList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);
    const { isLoading, countries } = useSelector((state) => state.countries);
    return (
        <div className="country-section min-h-screen">
            <div className="lg:flex justify-center items-center gap-16 w-3/4 mx-auto pt-12 md:pt-20">
                <div className="w-full ">
                    <h1 className="text-xl lg:text-1xl xl:text-3xl text-center">
                        Challenge Your Knowledge: Dive into Our Quizzes tailored for Every
                        Country!
                    </h1>

                    {isLoading ? (
                        <div className="w-1/4 mx-auto mt-12">
                            <Loader></Loader>
                        </div>
                    ) : (
                        <div className="mt-8 grid grid-cols-2 gap-4 md:w-2/4 mx-auto">
                            {countries.map((country) => (
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

                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
};

export default CountryList;

