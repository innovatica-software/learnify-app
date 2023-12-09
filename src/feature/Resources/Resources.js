import React, { useEffect } from "react";
import "./Resources.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../state/reducers/resources/resourcesSlice";
import Loader from "../../components/Loader/Loader";
import { Grid, Button } from "@mui/material";
const Resources = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);
  const { isLoading, resource } = useSelector((state) => state.resources);
  return (
    <div style={{ marginBottom: "20px" }} className="my-4 min-h-screen">
      <h1 className="text-xl lg:text-3xl xl:text-4xl text-center my-5">
        Discover a Wealth of Educational Materials.
      </h1>
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center mt-16">
          <Loader></Loader>
        </div>
      ) : (
        <div
          style={{ borderRadius: "5px" }}
          className="grid md:grid-cols-3 gap-4 w-3/4 lg:w-3/4 xl:w-3/4 mx-auto mt-2"
        >
          {resource.map((rcs) => (
            <div key={rcs.id} className="resources-card ">
              <img
                src={rcs.thumbnail}
                alt={rcs.title}
                className="w-full h-60"
              />
              <h3 className="text-start text-xl  m-4 font-bold text-white ">
                {rcs.title}
              </h3>
              <h3 className="text-white m-4 text-start font-medium">
                {rcs.description}
              </h3>
              <Grid container justifyContent="flex-start">
                <Button
                  href={rcs.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "5px",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  WATCH
                </Button>
              </Grid>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
