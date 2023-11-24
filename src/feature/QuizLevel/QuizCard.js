import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const QuizCard = ({ isLocked, title, quizId, cost, isPurchase }) => {
  const { user } = useSelector((state) => state.user);

  const handlePurchaseLevel = async () => {
    Swal.fire({
      title: "Unlock Quiz Level",
      text: "Are you sure you want to unlock this quiz level?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unlock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Quiz Unlocked!",
          text: "You have successfully unlocked the quiz.",
          icon: "success",
        });
      }
    });
  };
  const handleQuizClick = () => {
    if (!isLocked) {
      Swal.fire({
        title: "Confirm quiz attempt?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Attempt",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } else {
      console.log(user.coin);
      if (!isPurchase) {
        Swal.fire({
          title: "Warning!",
          text: "You must unlock the previous level first.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else if (user.coin < cost) {
        Swal.fire({
          title: "Warning!",
          text: "You have not enough coin.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        handlePurchaseLevel();
      }
      console.log(`Quiz ID ${quizId} is locked.`);
    }
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
      <Card variant="outlined" style={{ width: "100%", height: "100%" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography color="text.secondary">Cost: {cost}</Typography>
          {isLocked ? (
            <>
              <LockIcon color="primary" fontSize="large" />
              <Button onClick={handleQuizClick} variant="contained">
                Unlock
              </Button>
            </>
          ) : (
            <Button onClick={handleQuizClick} variant="contained">
              Start Quiz
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuizCard;
