import { Button } from "@mui/material";
import React from "react";

const Discussion = () => {
  const countries = [
    {
      'id': 1,
      'name': 'SPANISH',
      'flag': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkV2KPhmQcsWdlmRwc2VRixC-zWoxJTh526lZvSoxE0puQ94cf3UlcUum6jNOdMwnQG8&usqp=CAU'
    },
    {
      'id': 2,
      'name': 'FRENCH',
      'flag': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBkn1cADdPUb6hEs03naiB2XqMIXcAEcvbX9F1La_QoTEt9pEOi6emHE3P1agFFOLbFk&usqp=CAU'
    },
    {
      'id': 3,
      'name': 'GERMAN',
      'flag': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUC36DLpn-_EO_jU5oFFPl0AdXonevi3oRd8CgT2e7ZTwuB8f6BXI7Vah436rBSlVZ8-c&usqp=CAU'
    },
    {
      'id': 4,
      'name': 'ITALIAN',
      'flag': 'https://static.vecteezy.com/system/resources/thumbnails/011/074/208/small/circle-flag-of-italy-free-vector.jpg'
    },
  ]
  return (
    <div className="flex flex-1 justify-center items-center w-3/4 mx-auto mt-8 md:mt-24 ">
      <div className="grid md:grid-cols-2 gap-4 md:w-3/4 ">
        {countries.map(country => (
          <div className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl ">
            <div className="flex justify-between">
            <p className="text-start  text-gray-900 capitalize font-semibold dark:text-gray-300 group-hover:text-gray-300">Lorem ipsum dolor sit amet </p>
            <Button variant="contained">Add</Button>
            </div>
            <div className="sm:-mx-4 mt-4">
              <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full sm:mx-4 ring-4 ring-gray-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

              <div className="mt-4 sm:mx-4 sm:mt-0">
                <h1 className="text-sm text-start font-semibold text-gray-700 capitalize mt-2">arthur melo</h1>
                <p className="text-xs text-start mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Discussion;

