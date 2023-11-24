import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscussion } from "../../state/reducers/discussion/discussionSLice";
import { newFormatDate } from "../../utilities/helper";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
const Discussion = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDiscussion());
  }, [dispatch]);
  const { isLoading, discussion } = useSelector((state) => state.discussions);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="w-4/4 mx-auto mt-8 md:mt-8 ">
      {isAuthenticated ? (
        <div className="flex justify-between items-center">
          <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mt-16 "></div>
          <div className="w-1/4 pl-24 flex ">
            <Button variant="contained">Create Discussion</Button>
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 justify-center items-center ">
        {isLoading ? (
          <div className="flex flex-1 justify-center items-center mt-16">
            <Loader></Loader>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mt-16 ">
            {discussion.map((dsc) => (
              <div
                key={dsc._id}
                className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl "
              >
                <p className="text-start  text-gray-900 capitalize font-semibold dark:text-gray-300 group-hover:text-gray-300">
                  {dsc.title}{" "}
                </p>
                <p className="text-start mt-2  text-gray-400 capitalize font-medium dark:text-gray-300 group-hover:text-gray-300">
                  {dsc.description}{" "}
                </p>
                <div className="flex items-center mt-4">
                  <div className="flex-shrink-0 object-cover w-10 h-10 rounded-full ring-2 ring-gray-300">
                    {dsc?.author?.image ? (
                      <Avatar alt="Profile Image" src={dsc?.author?.image} />
                    ) : (
                      <AccountCircle style={{ width: 40, height: 40 }} />
                    )}
                  </div>
                  <div className="ml-2">
                    <h1 className="text-sm text-start font-semibold text-gray-700 capitalize mt-2">
                      {dsc?.author?.name}
                    </h1>
                  </div>
                </div>
                <h1
                  className="text-sm text-start font-semibold text-gray-400 capitalize mt-2"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="text-gray-900">
                    {newFormatDate(dsc.createdAt)}
                  </span>
                  <Link to={`/discussion/${dsc.discussionId}`}>Answers</Link>
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
