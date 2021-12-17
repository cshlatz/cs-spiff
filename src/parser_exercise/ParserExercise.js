import React, { useState } from "react";
import Exercise from "../exercise/Exercise";
import Button from "./Button";
import { parse } from './utils/parseUtils';
import "./ParserExercise.scss";

const ParserExercise = () => {
  return (
    <div className="parser">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/2"
        title="Parser Exercise"
      />
    </div>
  );
};

export default ParserExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [phrase, setPhrase] = useState("");
  const [count, setCount] = useState({});

  // Parses the text area
  const handleParseClick = () => {
    setCount(parse(phrase));
  };

  // Resets the text area state
  const resetTextArea = () => {
    setPhrase("");
    setCount({});
  };

  // Will output on rerender (state change);
  const characterCounts = () => {
    let output = [];
    for (const character in count) {
      output.push(
        <div className="canvas__character">
          <span className="canvas__character-key">{`${character}:`}</span>
          <span className="canvas__character-count">{`${count[character]}`}</span>
        </div>
      );
    }

    return output;
  };

  return (
    <div className="canvas">
        <div className="canvas__text-input">
          <label for="canvas__textarea">Phrase</label>
          <textarea
            onChange={e => setPhrase(e.target.value)}
            name="canvas__textarea"
            value={phrase}
          />
        </div>
        <Button callback={() => handleParseClick()} label="Parse" className="canvas__button canvas__parse-button" />
        <Button callback={() => resetTextArea()} label="Reset" className="canvas__button canvas__reset-button" />
        {characterCounts()}
    </div>
  )
};
