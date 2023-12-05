import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import { QuizBox, QuizButton } from "./UIElements";
import styled from "styled-components";
import ShowConfetti from "./ShowConfetti";
import ShowMessage from "./ShowMessage";
import { Typography } from "@mui/material";
import { theme } from "../../Theme/AppTheme";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizData,
  setSubmitQuizState,
  submitQuizAnswers,
} from "../../state/reducers/quiz/quizSlice";
import Loader from "../../components/Loader/Loader";
import { getStudentDetails } from "../../state/reducers/auth/authSlice";
const BasicGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
`;
const Quiz = () => {
  const [avg, setAvg] = useState(0);
  const { levelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const msg = new SpeechSynthesisUtterance();
  const { isAuthenticated, user, token } = useSelector((state) => state.user);
  const { isLoading, questions, isSubmitQuiz, errorMessage } = useSelector(
    (state) => state.quizLevel
  );
  useEffect(() => {
    if (isSubmitQuiz) {
      dispatch(getStudentDetails(token));
      dispatch(setSubmitQuizState());
    }
  }, [dispatch, isSubmitQuiz, token]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchQuizData({ token: user.token, levelId }));
    }
  }, [dispatch, isAuthenticated, levelId, navigate, user.token]);
  const [questionVoiced, setQuestionVoiced] = useState(false);
  const voiceQuestion = (text) => {
    window.speechSynthesis.cancel();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  // const questions = [
  //   {
  //     title: "What is the capital of France?",
  //     options: ["Paris", "Rome", "Madrid", "Berlin"],
  //     answer: [0],
  //   },
  //   {
  //     title: "Who painted the Mona Lisa?",
  //     options: [
  //       "Vincent van Gogh",
  //       "Leonardo da Vinci",
  //       "Pablo Picasso",
  //       "Michelangelo",
  //     ],
  //     answer: [1],
  //   },
  //   {
  //     title: "Which planet is known as the Red Planet?",
  //     options: ["Mars", "Jupiter", "Venus", "Mercury"],
  //     answer: [0],
  //   },
  //   {
  //     title: "Who wrote 'To Kill a Mockingbird'?",
  //     options: [
  //       "Harper Lee",
  //       "Charles Dickens",
  //       "Mark Twain",
  //       "F. Scott Fitzgerald",
  //     ],
  //     answer: [0],
  //   },
  //   // {
  //   //   title: "What is the largest mammal in the world?",
  //   //   options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
  //   //   answer: [2],
  //   // },
  //   // {
  //   //   title: "What year did World War II end?",
  //   //   options: ["1943", "1945", "1950", "1939"],
  //   //   answer: [1],
  //   // },
  //   // {
  //   //   title: "Which country is known as the Land of the Rising Sun?",
  //   //   options: ["China", "India", "Japan", "South Korea"],
  //   //   answer: [2],
  //   // },
  //   // {
  //   //   title: "What is the chemical symbol for gold?",
  //   //   options: ["Go", "Ag", "Au", "Gl"],
  //   //   answer: [2],
  //   // },
  //   // {
  //   //   title: "Who developed the theory of relativity?",
  //   //   options: [
  //   //     "Isaac Newton",
  //   //     "Albert Einstein",
  //   //     "Stephen Hawking",
  //   //     "Galileo Galilei",
  //   //   ],
  //   //   answer: [1],
  //   // },
  //   // {
  //   //   title:
  //   //     "Which famous scientist was awarded the Nobel Prize for discovering the structure of DNA?",
  //   //   options: [
  //   //     "Marie Curie",
  //   //     "Francis Crick",
  //   //     "Alexander Fleming",
  //   //     "James Watson",
  //   //   ],
  //   //   answer: [1],
  //   // },
  // ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(-1)
  );
  const [showScore, setShowScore] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const handleNextQuestion = () => {
    setQuestionVoiced(!questionVoiced);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const [timer, setTimer] = useState(120);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setTimeUp(true);
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (timeUp) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeUp]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:00`;
  };

  const handlePrevQuestion = () => {
    setQuestionVoiced(!questionVoiced);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    window.speechSynthesis.cancel();
    const { score, average } = calculateScore();
    setQuizScore(score);
    setShowScore(true);
    if (average >= 80) {
      const data = {
        quizId: levelId,
        point: score,
        attemptResults: selectedOptions,
      };
      dispatch(submitQuizAnswers({ data, token }));
    }
    console.log(score, average);
    console.log("Submitted options:", selectedOptions);
  };

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);
    voiceQuestion(questions[currentQuestion].options[option]);
  };

  useEffect(() => {
    if (!questionVoiced && questions.length > 0) {
      voiceQuestion(questions[currentQuestion].title);
      setQuestionVoiced(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, questionVoiced, setQuestionVoiced]);

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.ans[0] === selectedOptions[index]) {
        score += 1;
      }
    });
    setAvg((score / questions.length) * 100);
    return { score, average: (score / questions.length) * 100 };
  };

  const noQuestionsAvailable =
    !isLoading && (!questions || questions.length === 0);

  if (showScore) {
    return (
      <>
        {avg >= 10 && <ShowConfetti whenToShow={showScore} />}
        <QuizBox>
          <div className="spacer"></div>
          <div className="top" style={{ textAlign: "center" }}>
            <ShowMessage avg={avg} />
            <p>
              you scored <strong>{quizScore}</strong> out of{" "}
              <strong>{questions.length}</strong> ={" "}
              <strong>{avg.toFixed(1)}%</strong>
            </p>
          </div>
          {/* <Button onClick={reset}>Start over?</Button> */}
        </QuizBox>
      </>
    );
  }
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f3f3f3",
    },
    message: {
      textAlign: "center",
      color: "#333",
      padding: "20px",
      border: "2px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fff",
    },
    text: {
      margin: "10px 0",
    },
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center mt-16">
          <Loader></Loader>
        </div>
      ) : (
        <QuizBox
          style={{ padding: "50px", backgroundColor: "#acf5ec", color: "#fff" }}
        >
          {noQuestionsAvailable ? (
            <div style={styles.message}>
              {errorMessage ? (
                <>
                  <p style={styles.text}>{errorMessage}</p>
                </>
              ) : (
                <>
                  <p style={styles.text}>
                    No questions available at the moment.
                  </p>
                  <p style={styles.text}>Please check back later.</p>
                </>
              )}
            </div>
          ) : (
            <div>
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#000000",
                  }}
                >
                  <div>
                    <Typography variant="h6">
                      Question {currentQuestion + 1} of {questions.length}
                    </Typography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      {formatTime(timer)}
                    </Typography>
                  </div>
                </div>
                <div className="question">
                  <h2 className="question-text" style={{ color: "#000000" }}>
                    {" "}
                    {questions[currentQuestion].title}
                  </h2>
                </div>
              </>
              <BasicGrid className="answers-row middle">
                <>
                  {questions[currentQuestion].options.map((option, idx) => (
                    <QuizButton
                      className="ans"
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      style={{
                        backgroundColor:
                          selectedOptions[currentQuestion] === idx
                            ? "#00BFFF"
                            : `${theme.buttonColor}`,
                        color:
                          selectedOptions[currentQuestion] === idx
                            ? "#fff"
                            : "#fff",
                      }}
                    >
                      {option}
                    </QuizButton>
                  ))}
                </>
              </BasicGrid>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent:
                    currentQuestion > 0 ? "space-between" : "flex-end",
                }}
              >
                {currentQuestion > 0 && (
                  <Button variant="contained" onClick={handlePrevQuestion}>
                    Previous
                  </Button>
                )}
                {currentQuestion === questions.length - 1 ? (
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNextQuestion}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </QuizBox>
      )}
    </Container>
  );
};

export default Quiz;
