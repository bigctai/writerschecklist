import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import { Button } from "./Button/Button";
import { CheckBox } from "./CheckBox/CheckBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Title } from "./Title/Title";

function Search() {
  const [click1, setClick1] = useState(false);
  const handleClick1 = () => setClick1(!click1);
  const [click2, setClick2] = useState(false);
  const handleClick2 = () => setClick2(!click2);
  const [click3, setClick3] = useState(false);
  const handleClick3 = () => setClick3(!click3);
  const [click4, setClick4] = useState(false);
  const handleClick4 = () => setClick4(!click4);
  const [genre, setGenre] = useState([]);
  const [status, setStatus] = useState([0]);
  const handleGenre = (chosenGenre) => {
    if (genre.includes(chosenGenre)) {
      var array = genre;
      var index = array.indexOf(chosenGenre);
      array.splice(index, 1);
      setGenre(array);
    } else {
      genre.push(chosenGenre);
    }
    console.log(genre);
  };

  const [wordCount, setWordCount] = useState("Any");
  const handleWordCount = (words) => {
    setWordCount(words);
  };
  const [ageRange, setAgeRange] = useState([]);
  const handleAgeRange = (range) => {
    if (ageRange.includes(range)) {
      var array = ageRange;
      var index = array.indexOf(range);
      array.splice(index, 1);
      setAgeRange(array);
    } else {
      ageRange.push(range);
    }
    ageRange.sort();
    handleActualAgeRange();
  };

  const handleOpen = (status) => {
    setStatus(status);
  };

  const [actualAgeRange, setActualAgeRange] = useState("Any");
  const handleActualAgeRange = () => {
    var aAR = "";
    ageRange.map((range) => {
      aAR += `${range}`;
    });
    setActualAgeRange(aAR);
    console.log(actualAgeRange);
  };
  return (
    <div className="search-container">
      <Title
        className="ttl"
        color="orange"
        size="small"
        titleName="Find Literary Journals That Fit Your Work"
      ></Title>
      <h2 className="filters">
        <Link to="/Explore">Browse All</Link> or Search With Filters
      </h2>
      {/*make a search bar component*/}
      <div className="searching">
        <input className="bar" type="search" placeholder="Search"></input>
        <div>
          <h2 className="filters">Filters:</h2>
          <div className="filter-list">
            <h3 className="filter-option">
              Genre
              <span onClick={handleClick1}>
                <FontAwesomeIcon
                  className="arrow"
                  icon={click1 ? faAngleDown : faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </h3>
            <div className={`list ${click1 ? "display" : "none"}`}>
              <CheckBox
                label="Any"
                onClick={(event) => handleGenre(1)}
              ></CheckBox>
              <CheckBox
                label="Fantasy"
                onClick={(event) => handleGenre(2)}
              ></CheckBox>
              <CheckBox
                label="Realistic"
                onClick={(event) => handleGenre(3)}
              ></CheckBox>
            </div>
            <h3 className="filter-option">
              Word Count
              <span onClick={handleClick2}>
                <FontAwesomeIcon
                  className="arrow"
                  icon={click2 ? faAngleDown : faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </h3>
            <div className={`list ${click2 ? "display" : "none"}`}>
              <CheckBox
                label="1000"
                onClick={(event) => handleWordCount(1000)}
              ></CheckBox>
              <CheckBox
                label="2500"
                onClick={(event) => handleWordCount(2500)}
              ></CheckBox>
              <CheckBox
                label="4000"
                onClick={(event) => handleWordCount(4000)}
              ></CheckBox>
              <CheckBox
                label="6000"
                onClick={(event) => handleWordCount(6000)}
              ></CheckBox>
              <CheckBox
                label="6000+"
                onClick={(event) => handleWordCount(1000000)}
              ></CheckBox>
            </div>
            <h3 className="filter-option">
              Age Range
              <span onClick={handleClick3}>
                <FontAwesomeIcon
                  className="arrow"
                  icon={click3 ? faAngleDown : faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </h3>
            <div className={`list ${click3 ? "display" : "none"}`}>
              <CheckBox
                label="Middle School"
                onClick={(event) => handleAgeRange(1)}
              ></CheckBox>
              <CheckBox
                label="High School"
                onClick={(event) => handleAgeRange(2)}
              ></CheckBox>
              <CheckBox
                label="Teen"
                onClick={(event) => handleAgeRange(4)}
              ></CheckBox>
              <CheckBox
                label="Undergraduate"
                onClick={(event) => handleAgeRange(3)}
              ></CheckBox>
              <CheckBox
                label="All Ages"
                onClick={(event) => handleAgeRange(5)}
              ></CheckBox>
            </div>
            <h3 className="filter-option">
              Open
              <span onClick={handleClick4}>
                <FontAwesomeIcon
                  className="arrow"
                  icon={click4 ? faAngleDown : faAngleRight}
                ></FontAwesomeIcon>
              </span>
            </h3>
            <div className={`list ${click4 ? "display" : "none"}`}>
              <CheckBox
                label="Yes"
                onClick={(event) => handleOpen(2)}
              ></CheckBox>
              <CheckBox
                label="No"
                onClick={(event) => handleOpen(1)}
              ></CheckBox>
            </div>
          </div>

          <Button
            className="btn-orng"
            buttonStyle="btn--white"
            buttonSize="btn--medium"
            destination={`/Explore${`/${wordCount}`}${`/${actualAgeRange}`}${`/${status}`}`}
          >
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Search;
