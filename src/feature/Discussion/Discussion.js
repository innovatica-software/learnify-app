import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscussion } from "../../state/reducers/discussion/discussionSLice";
import { RxAvatar } from "react-icons/rx";
import { formatDate } from "../../utilities/helper";
import Loader from "../../components/Loader/Loader";
const Discussion = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDiscussion());
  }, [dispatch]);
  const { isLoading, discussion } = useSelector((state) => state.discussion);
  const { token } = useSelector((state) => state.user);

  return (
    <div className="w-3/4 mx-auto mt-8 md:mt-24 ">
      {
        token ? <div className="w-1/4 pl-24">
        <Button variant="contained" >Add </Button>
      </div>:null
      }
      <div className="flex flex-1 justify-center items-center ">
        {
          isLoading ? <div className="flex flex-1 justify-center items-center mt-16">
            <Loader></Loader>
          </div> : <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mt-16 ">
            {discussion.map(dsc => (
              <div key={dsc._id} className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl ">
                <p className="text-start  text-gray-900 capitalize font-semibold dark:text-gray-300 group-hover:text-gray-300">{dsc.title} </p>
                <p className="text-start mt-2  text-gray-400 capitalize font-medium dark:text-gray-300 group-hover:text-gray-300">{dsc.description} </p>
                <div className="sm:-mx-4 mt-4">
                  <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full sm:mx-4 ring-4 ring-gray-300" src={dsc?.author?.image || <RxAvatar />} alt="" />
                  <div className="mt-4 sm:mx-4 sm:mt-0">
                    <h1 className="text-sm text-start font-semibold text-gray-700 capitalize mt-2">{dsc?.author?.name}</h1>
                  </div>
                </div>
                <h1 className="text-sm text-start font-semibold text-gray-400 capitalize mt-2">
                  created at <span className="text-gray-900"> {formatDate(dsc.createdAt)}</span></h1>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Discussion;

