import React from "react";
import { Button } from "./Button/Button";
import "./HeroSection.css";
import Title from "./Title/Title";

function HeroSection() {
  return (
    <div className="hero-container">
      <Title titleName="Welcome to Writer's Checklist" />
      <p>
        Keep Track of All of Your Submissions <br></br> So You Never Miss
        Another Deadline Again
      </p>
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
  );
}

export default HeroSection;
