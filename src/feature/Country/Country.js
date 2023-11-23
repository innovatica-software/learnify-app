import React from "react";
import './Country.css';
import { FiPlusCircle } from "react-icons/fi";
const Country = () => {
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
    <div className="country-section">
      <div className="lg:flex justify-center items-center gap-16 w-3/4 mx-auto md:pt-20">
        <div className="w-full ">
          <h1 className="text-xl lg:text-4xl xl:text-5xl text-start">Which language do you want to try ?</h1>
          <div className="mt-8 grid grid-cols-2 gap-4 md:w-3/4 ">
            {countries.map(country => (
              <div key={country.id} className="country-card mt-4 w-full border">
                  <img src={country.flag} alt={country.name} className="h-10 w-10  "/>
                <h3 className="font-bold">{country.name}</h3>
              </div>
            ))}
            <button className="bg-white h-12 w-full mt-4 border rounded font-bold flex justify-center items-center gap-2 "> <FiPlusCircle className="text-xl font-bold"/> MORE</button>
          </div>
        </div>
        <div className='w-full'>
          <img src="https://www.babbel.com/static/index_page/en_US/images/hero-large-en.4ea397b62160120f1e32.webp" alt="" className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Country;
