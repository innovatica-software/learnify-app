import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Quiz.css';
import LockImg from '../../assets/lock.png'
const QuizCard = ({ isLocked, title, quizId, cost, isPurchase, index }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
          navigate(`/quiz/${quizId}`);
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
      <Card className='quiz-card-section'>
        <CardContent style={{ textAlign: "center" }} onClick={handleQuizClick} >
          {
            isLocked ? <Typography variant="h5" component="div" style={{ marginTop: 20, marginBottom: 10 }}>

            </Typography> : <Typography variant="h5" component="div" style={{ marginTop: 20, marginBottom: 10, color: 'white', fontSize: 90, fontWeight: 'bold' }}>
              {index + 1}
            </Typography>
          }
          {isLocked ? (
            <div className="w-2/4 mx-auto ">
              <img src={LockImg} alt="hello" className="h-full w-full " />
            </div>
          ) :
            null
          }
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuizCard;
