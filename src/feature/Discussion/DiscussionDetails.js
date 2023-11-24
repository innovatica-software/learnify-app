import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { newFormatDate } from "../../utilities/helper";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Loader from "../../components/Loader/Loader";
import {
  fetchDiscussionDetails,
  postComment,
  setCommentPostState,
} from "../../state/reducers/discussion/discussionDetailsSlice";

const DiscussionDetails = () => {
  const dispatch = useDispatch();
  const { discussionId } = useParams();
  const { isLoading, data, isCommnetPost } = useSelector(
    (state) => state.discussion.discussion
  );
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDiscussionDetails(discussionId));
    };
  
    if (isCommnetPost) {
      fetchData();
      dispatch(setCommentPostState());
    } else {
      fetchData();
    }
  }, [dispatch, discussionId, isCommnetPost]);
  

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    dispatch(postComment({ token: user.token, discussionId, comment }));
    setComment("");
    dispatch(fetchDiscussionDetails(discussionId));
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <div className="w-3/4 md:w-2/4 mx-auto mt-12">
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center mt-16">
          <Loader></Loader>
        </div>
      ) : (
        <div>
          <Link to="/discussion">
            <p className="text-blue-500 text-start text-sm flex items-center mt-4">
              {" "}
              <MdKeyboardArrowLeft className="text-xl" /> Back to discussion
            </p>
          </Link>
          <p className="text-start text-xs text-gray-500 mt-4">
            {" "}
            {newFormatDate(data?.createdAt)}
          </p>
          <p className="text-start text-xl text-gray-900 mt-4">
            {" "}
            {data?.title}
          </p>
          <div className="flex items-center mt-8">
            <div className="flex-shrink-0 object-cover w-10 h-10 rounded-full ring-2 ring-gray-300">
              {data?.discussionAuthor?.image ? (
                <Avatar
                  alt="Profile Image"
                  src={data?.discussionAuthor?.image}
                />
              ) : (
                <AccountCircle style={{ width: 40, height: 40 }} />
              )}
            </div>
            <div className="ml-2">
              <h1 className="text-sm text-start font-semibold text-gray-700 capitalize mt-2">
                {data?.discussionAuthor?.name}
              </h1>
            </div>
          </div>
          <p className="text-start text-xl text-gray-900 my-8">
            {" "}
            {data?.description}
          </p>
          <hr />
          <div>
            {data?.comments.map((cmnt) => (
              <div
                className="w-full mt-4"
                key={cmnt.commentId}
                style={{ borderBottom: "1px solid #ccc", paddingBottom: 8 }}
              >
                <Typography style={{ textAlign: "left", paddingLeft: 20 }}>
                  {cmnt.comment}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Avatar
                    src={cmnt.studentInfo?.profilePic}
                    alt={cmnt.studentInfo?.name}
                    style={{ marginRight: 8 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle2">
                      {cmnt.studentInfo?.name}
                    </Typography>
                    <Typography variant="caption">
                      {" "}
                      {newFormatDate(cmnt.createdAt)}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isAuthenticated && (
            <div
              className="w-full mt-8"
              style={{
                margin: "auto",
                padding: 16,
                marginTop: 16,
                marginBottom: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                id="comment"
                label="Write a comment"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={comment}
                onChange={handleInputChange}
                style={{ marginBottom: 16 }}
              />
              <div style={{ alignSelf: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscussionDetails;
