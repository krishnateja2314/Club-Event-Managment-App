import React from "react";

interface props {
  text: string;
}

function Test({ text }: props) {
  return <div>{text}</div>;
}

export default Test;
