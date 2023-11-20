import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import { QuizBox, QuizButton } from "./UIElements";
import styled from "styled-components";
import ShowConfetti from "./ShowConfetti";
import ShowMessage from "./ShowMessage";
import { Typography } from "@mui/material";
const BasicGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
`;
const Quiz = () => {
  const [avg, setAvg] = useState(0);
  const [questionVoiced, setQuestionVoiced] = useState(false);
  const voiceQuestion = (text) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const questions = [
    {
      title: "What is the capital of France?",
      options: ["Paris", "Rome", "Madrid", "Berlin"],
      answer: [0],
    },
    {
      title: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Michelangelo",
      ],
      answer: [1],
    },
    {
      title: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Mercury"],
      answer: [0],
    },
    {
      title: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        "Harper Lee",
        "Charles Dickens",
        "Mark Twain",
        "F. Scott Fitzgerald",
      ],
      answer: [0],
    },
    // {
    //   title: "What is the largest mammal in the world?",
    //   options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
    //   answer: [2],
    // },
    // {
    //   title: "What year did World War II end?",
    //   options: ["1943", "1945", "1950", "1939"],
    //   answer: [1],
    // },
    // {
    //   title: "Which country is known as the Land of the Rising Sun?",
    //   options: ["China", "India", "Japan", "South Korea"],
    //   answer: [2],
    // },
    // {
    //   title: "What is the chemical symbol for gold?",
    //   options: ["Go", "Ag", "Au", "Gl"],
    //   answer: [2],
    // },
    // {
    //   title: "Who developed the theory of relativity?",
    //   options: [
    //     "Isaac Newton",
    //     "Albert Einstein",
    //     "Stephen Hawking",
    //     "Galileo Galilei",
    //   ],
    //   answer: [1],
    // },
    // {
    //   title:
    //     "Which famous scientist was awarded the Nobel Prize for discovering the structure of DNA?",
    //   options: [
    //     "Marie Curie",
    //     "Francis Crick",
    //     "Alexander Fleming",
    //     "James Watson",
    //   ],
    //   answer: [1],
    // },
  ];

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
  const [timer, setTimer] = useState(60);
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
    const score = calculateScore();
    setQuizScore(score);
    setShowScore(true);
    console.log("Submitted options:", selectedOptions);
  };

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);
    voiceQuestion(questions[currentQuestion].options[option]);
  };

  useEffect(() => {
    if (!questionVoiced) {
      voiceQuestion(questions[currentQuestion].title);
      setQuestionVoiced(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, questionVoiced, setQuestionVoiced]);

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.answer[0] === selectedOptions[index]) {
        score += 1;
      }
    });
    setAvg((score / questions.length) * 100);
    return score;
  };

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
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <QuizBox
        style={{ padding: "50px", backgroundColor: "#1F1047", color: "#fff" }}
      >
        <div>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
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
              <h2 className="question-text">
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
                        : "#7D58FF",
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
      </QuizBox>
    </Container>
  );
};

export default Quiz;
