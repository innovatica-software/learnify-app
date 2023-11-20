import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
const ShowConfetti = ({ whenToShow }) => {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti
        width={width}
        height={height}
        run={whenToShow}
        initialVelocityX={20}
        initialVelocityY={10}
        recycle={false}
        confettiSource={{ y: height / 2, x: width / 2 }}
        numberOfPieces={1400}
      />
      {/* <Confetti
        width={width}
        height={height}
        run={whenToShow}
        initialVelocityX={20}
        initialVelocityY={10}
        recycle={false}
        confettiSource={{ x: -20, y: height / 2 }}
        numberOfPieces={1400}
      /> */}
    </>
  );
};

export default ShowConfetti;
