import React from "react";

const ShowMessage = ({ avg }) => {
  let message = {
    text: "",
    emoji: "",
  };

  if (avg >= 80) {
    message.text = "Excellent Work!";
    message.emoji = "🎉";
  } else if (avg >= 70) {
    message.text = "Good Work!";
    message.emoji = "🥂";
  } else {
    message.text = "Keep Practicing";
    message.emoji = "💪";
  }

  return (
    <>
      <h2 className="emoji">{message.emoji}</h2>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          lineHeight: "1.2",
          letterSpacing: "2px",
        }}
      >
        {message.text}
      </h1>
    </>
  );
};

export default ShowMessage;
