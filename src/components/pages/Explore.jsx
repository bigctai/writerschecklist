import React from "react";
import "../../App.css";
import Journals from "../Journals";
import { useParams } from "react-router-dom";

function Explore() {
  const parameters = useParams();
  var word_count;
  var range;
  var status;
  if (parameters) {
    word_count = parameters.word_count;
    range = parameters.age_range;
    status = parameters.status;
  }

  return (
    <div>
      <Journals words={word_count} range={range} status={status} />
    </div>
  );
}

export default Explore;
