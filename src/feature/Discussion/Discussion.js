import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDiscussion,
  fetchDiscussion,
  resetDiscussionCreated,
} from "../../state/reducers/discussion/discussionSLice";
import { newFormatDate } from "../../utilities/helper";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { showSuccessToast } from "../../components/Toast/Toast";

const Discussion = () => {
  const dispatch = useDispatch();
  const { isLoading, discussion, isDiscussionCreated } = useSelector(
    (state) => state.discussions
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    if (isDiscussionCreated) {
      dispatch(fetchDiscussion());
      showSuccessToast("Discussion Successfully created");
      dispatch(resetDiscussionCreated());
    }
  }, [dispatch, isDiscussionCreated]);
  useEffect(() => {
    dispatch(fetchDiscussion());
  }, [dispatch]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleSubmit = () => {
    const discussionData = { title: textValue, description: textareaValue };
    dispatch(createDiscussion({ discussionData, token: user.token }));
    handleClose();
  };

  return (
    <div className="w-4/4 mx-auto mt-8 md:mt-8 ">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Discussion Forum</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Title"
            variant="outlined"
            value={textValue}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            id="comment"
            label="Write discussion"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={textareaValue}
            onChange={handleTextareaChange}
            style={{ marginBottom: 16 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {isAuthenticated ? (
        <div className="flex justify-between items-center">
          <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mt-16 "></div>
          <div className="w-1/4 pl-24 flex ">
            <Button variant="contained" onClick={handleClickOpen}>
              Create Discussion
            </Button>
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
