import React from "react";
import parse from "html-react-parser";
export const formatText = (text: string) => {
  return text.split("\n").map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));
};

export const replaceNewLinesWithBr = (htmlString: string) => {
  const formattedText = htmlString.replace(/\n/g, "<br />");
  return parse(formattedText);
};
