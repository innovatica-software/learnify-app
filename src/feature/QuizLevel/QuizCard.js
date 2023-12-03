import React, { useEffect } from "react";
import { Card, CardContent, Typography, Container } from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import LockImg from "../../assets/lock.png";
import {
  fetchQuizLevels,
  setIsSubscribed,
  subscribeQuizLevel,
} from "../../state/reducers/quiz/quizLevelSlice";
import { getStudentDetails } from "../../state/reducers/auth/authSlice";
import Rating from "@mui/material/Rating";
const QuizCard = ({
  isLocked,
  title,
  quizId,
  cost,
  isPurchase,
  index,
  countryId,
  isAttempted,
}) => {
  const { user } = useSelector((state) => state.user);
  const { isSubscribe } = useSelector((state) => state.quizLevels);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePurchaseLevel = async () => {
    Swal.fire({
      title: "Unlock Quiz Level",
      text: `To unlock this quiz level, you need ${cost} coins. Are you sure you want to proceed? Once unlocked, you can access and attempt this level.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unlock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          quizId,
          point: cost,
        };
        dispatch(subscribeQuizLevel({ token: user.token, data }));
      }
    });
  };
  const handleQuizClick = () => {
    if (!isLocked) {
      Swal.fire({
        title: "Confirm Quiz Attempt",
        text: "Are you sure you want to attempt this quiz?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Attempt",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/quiz/${quizId}`);
        }
      });
    } else {
      console.log(user.coin);
      if (!isPurchase) {
        Swal.fire({
          title: "Unlock Previous Level",
          text: "To proceed, you need to unlock the previous level first.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else if (user.coin < cost) {
        Swal.fire({
          title: "Insufficient Coins",
          text: `You need ${cost - user.coin} more coins to unlock this quiz.`,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        handlePurchaseLevel();
      }
      console.log(`Quiz ID ${quizId} is locked.`);
    }
  };

  useEffect(() => {
    if (isSubscribe) {
      Swal.fire({
        title: "Quiz Unlocked",
        text: "Congratulations! You have successfully unlocked the quiz.",
        icon: "success",
      });
      dispatch(setIsSubscribed());
      dispatch(getStudentDetails(user.token));
      dispatch(fetchQuizLevels({ countryId, token: user.token }));
    }
  }, [countryId, dispatch, isSubscribe, user.token]);
  let ratings = 3;
  const options = {
    size: "large",
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Card className="quiz-card-section">
        <CardContent
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          onClick={handleQuizClick}
        >
          {isAttempted && (
            <Rating
              {...options}
              size="medium"
              className="ratings-icons"
              max={3}
            />
          )}

          {isLocked ? (
            <Typography
              variant="h5"
              component="div"
              style={{ marginTop: 20, marginBottom: 10 }}
            ></Typography>
          ) : (
            <Typography
              variant="h5"
              component="div"
              style={{
                color: "white",
                fontSize: 90,
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </Typography>
          )}
          {isLocked ? (
            <div className="w-2/4 mx-auto">
              <img src={LockImg} alt="hello" className="h-36 w-full" />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuizCard;
