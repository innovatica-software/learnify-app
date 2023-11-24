import React from "react";
import { Grid, Container } from "@mui/material";
import QuizCard from "./QuizCard";

const CountryLevel = () => {
  const quizes = [
    {
      isLocked: false,
      title: "First Quiz",
      quizId: "1",
      cost: "10",
    },
    {
      isLocked: true,
      title: "SecondQuiz",
      quizId: "2",
      cost: "10",
    },
    {
      isLocked: true,
      title: "Third Quiz",
      quizId: "3",
      cost: "100",
    },
  ];
  const isPurchase = (currentIndex) => {
    if (
      currentIndex > 0 &&
      quizes[currentIndex].isLocked &&
      !quizes[currentIndex - 1].isLocked
    ) {
      return true;
    }
    return false;
  };
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {quizes.map((quiz, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <QuizCard
              isLocked={quiz.isLocked}
              title={quiz.title}
              quizId={quiz.quizId}
              cost={quiz.cost}
              isPurchase={isPurchase(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountryLevel;
