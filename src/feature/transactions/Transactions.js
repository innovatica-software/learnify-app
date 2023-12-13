import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentTransactions } from '../../state/reducers/account/transactionsSlice';
import Loader from '../../components/Loader/Loader';
import { formatDate, } from '../../utilities/helper';
import { BiSolidCoinStack } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Transactions = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getStudentTransactions(token));
    }, [dispatch, token]);
    const { transactions, isLoading } = useSelector(state => state.transactions);
    return (
        <div className="mt-12 min-h-screen w-3/4 md:w-2/4 mx-auto">
            <div className="w-3/4 mx-auto ">
                <h1 className="text-start text-2xl text-gray-500 p-4">All Transactions List </h1>
            </div>
            {
                isLoading ? <div className=" mt-16 flex justify-center items-center ">
                    <Loader ></Loader>
                </div> :
                    <div className="grid grid-cols-1 gap-4 w-full md:w-3/4 mx-auto mt-4 md:mt-12 ">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction._id}
                                className="px-2 md:px-12 py-2 md:py-4 transition-colors duration-300 transform border cursor-pointer rounded-xl "
                            >
                                <div >
                                    <div className="flex justify-between gap-8 mt-2">
                                        <p className=" text-sm font-semibold text-gray-400 text-start">Amount

                                        </p>
                                        <p className="flex  gap-2 text-red-500 font-semibold  text-end"> - {transaction.amount}
                                            <span >   <FaBangladeshiTakaSign className=" text-red-500 font-semibold  text-end text-xl"></FaBangladeshiTakaSign></span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between gap-8 mt-4">
                                        <p className=" text-sm font-semibold text-gray-400 text-start">Coin

                                        </p>
                                        <p className="flex gap-2 text-green-500 font-semibold  text-end"> + {transaction.coin}
                                            <span >   <BiSolidCoinStack className=" text-orange-500 font-semibold  text-end text-xl"></BiSolidCoinStack></span>
                                        </p>
                                    </div>
                                </div>
                                <h1
                                    className="text-sm text-start font-semibold text-gray-400 capitalize mt-4"
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <span className="text-gray-900">
                                        {formatDate(transaction.createdAt)}
                                    </span>
                                    <p>bkash</p>
                                </h1>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default Transactions;