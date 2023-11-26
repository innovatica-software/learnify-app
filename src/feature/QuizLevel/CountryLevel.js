import React, { useEffect } from "react";
import { Grid, Container } from "@mui/material";
import QuizCard from "./QuizCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizLevels } from "../../state/reducers/quiz/quizLevelSlice";
import { CircularProgress } from "@mui/material";
import NoQuizLevelsMessage from "./NoQuizLevelsMessage ";

const CountryLevel = () => {
  const { countryId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, levels } = useSelector((state) => state.quizLevels);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchQuizLevels({ countryId, token: user.token }));
  }, [countryId, dispatch, user.token]);
  const isPurchase = (currentIndex) => {
    if (
      currentIndex > 0 &&
      !levels[currentIndex].isUnlock &&
      levels[currentIndex - 1].isUnlock
    ) {
      return true;
    }
    return false;
  };
  return (
    <Container>
      {isLoading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Grid>
      ) : levels.length ? (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {levels.map((level, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <QuizCard
                isLocked={!level.isUnlock}
                title={level.levelName}
                quizId={level.levelId}
                cost={level.point}
                countryId={countryId}
                isPurchase={isPurchase(index)}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoQuizLevelsMessage />
      )}
    </Container>
  );
};

export default CountryLevel;
