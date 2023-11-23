import React from "react";
import './Resources.css'
const Resources = () => {
  const resources = [
    {
      'id': 1,
      'title': 'Learnify Videos',
      'desc': 'Explore the weird and wonderful things that make a language so fascinating.',
      'img': 'https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=sph',
      'type': 'Watch'
    },
    {
      'id': 2,
      'title': 'Learnify Podcasts',
      'desc': 'Listen as Babbel experts reveal language secrets and give you an inside look at local culture.',
      'img': 'https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=sph',
      'type': 'Listen'
    },

  ]
  return (

    <div className="grid md:grid-cols-2 gap-4 w-3/4 md:w-2/4 mx-auto mt-12">
      {resources.map(rcs => (
        <div key={rcs.id} className="resources-card mt-4 w-full border">
          <img src={rcs.img} alt={rcs.title} className="w-full h-48" />
          <div>
            <h3 className="text-start text-xl  m-4 font-bold text-white ">{rcs.title}</h3>
            <h3 className="text-white m-4 text-start font-medium">{rcs.desc}</h3>
            <button className="recources-btn mt-8">{rcs.type}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resources;
