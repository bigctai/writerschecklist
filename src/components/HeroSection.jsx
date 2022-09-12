import React from "react";
import { Button } from "./Button/Button";
import "./HeroSection.css";
import Title from "./Title/Title";

function HeroSection() {
  return (
    <div className="hero-container">
      <img
        className="background-image"
        src="images/writerschecklistbackground.jpeg"
      ></img>
      <div className="lesser-container">
        <div className="titles">
          <Title color="white" titleName="Welcome to" />
          <Title color="orange" titleName="Writer's Checklist" />
        </div>
        <p className="first-line">Keep Track of All of Your Submissions</p>
        <p className="important-line">So You Never Miss Another Deadline</p>
        <div className="hero-btn">
          <Button className="btn" destination="Signup" buttonSize="btn--large">
            Get Started
          </Button>
          <Button
            className="btn"
            destination="/ExploreSearch"
            buttonStyle="btn--white"
            buttonSize="btn--large"
          >
            Explore Literary Journals
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
