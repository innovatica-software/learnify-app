import React, { useEffect } from "react";
import './Resources.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../state/reducers/resources/resourcesSlice";
import Loader from "../../components/Loader/Loader";
const Resources = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);
  const { isLoading, resource } = useSelector(state => state.resources);
  return (

    <div >
      {
        isLoading ? <div className="flex flex-1 justify-center items-center mt-16">
          <Loader></Loader>
        </div> : <div className="grid md:grid-cols-2 gap-4 w-3/4 lg:w-2/4 mx-auto mt-12">
          {resource.map(rcs => (
            <div key={rcs.id} className="resources-card mt-4 w-full border">
              <img src={rcs.thumbnail} alt={rcs.title} className="w-full h-48" />
              <div>
                <h3 className="text-start text-xl  m-4 font-bold text-white ">{rcs.title}</h3>
                <h3 className="text-white m-4 text-start font-medium">{rcs.description}</h3>
                <a href={rcs.link} target="_blank" rel="noopener noreferrer">
                  <button className="recources-btn mt-8">See More</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Resources;
