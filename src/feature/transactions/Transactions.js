import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentTransactions } from '../../state/reducers/account/transactionsSlice';
import Loader from '../../components/Loader/Loader';
import { newFormatDate } from '../../utilities/helper';


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
                                className="px-2 md:px-12 py-2 md:py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl "
                            >
                                <div >
                                    <p className="text-sm font-semibold text-gray-400 text-start">Amount
                                        <span className="text-red-500 font-semibold  text-start"> - {transaction.amount} Tk</span>
                                    </p>
                                    <div className="flex justify-between gap-8 mt-2">
                                        <p className="text-sm font-semibold text-gray-400 text-start">Coin
                                            <span className="text-green-500 font-semibold  text-end"> + {transaction.coin}</span>
                                        </p>

                                    </div>
                                </div>
                                <h1
                                    className="text-sm text-start font-semibold text-gray-400 capitalize mt-2"
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <span className="text-gray-900">
                                        {newFormatDate(transaction.createdAt)}
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