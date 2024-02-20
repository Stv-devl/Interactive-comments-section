import React from "react";

const Content = ({ content, replyTo }) => {
  return (
    <>
      <p className="comment">
        <span className="answerTo">{replyTo && replyTo} </span>
        {content}
      </p>
    </>
  );
};

export default Content;
