import React from "react";
import "../../App.css";
import Journals from "../Journals";
import { useParams } from "react-router-dom";

function Explore() {
  const parameters = useParams();
  var word_count;
  var range;
  if (parameters) {
    word_count = parameters.word_count;
    range = parameters.age_range;
  }

  return (
    <div>
      <Journals words={word_count} range={range} />
    </div>
  );
}

export default Explore;
