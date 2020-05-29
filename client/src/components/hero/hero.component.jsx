import React from "react";
import Fade from "react-reveal/Fade";
import TextLoop from "react-text-loop";

import HERO_TEXT from "./hero-text.data.js";

import sculptureStudio from "../../assets/studio.sculpture.jpg";
import drawingStudio from "../../assets/studio.drawing.jpg";

import "./hero.styles.scss";

const Hero = () => (
  <div className="hero">
    <div className="hero-text-container">
      <Fade left duration={1500}>
        <h1 className="hero-text">Lofrano Arts</h1>
      </Fade>
      <Fade bottom delay={1000} duration={700}>
        <TextLoop
          className="hero-text-loop"
          children={HERO_TEXT}
          springConfig={{ stiffness: 75, damping: 20 }}
          adjustingSpeed={1000}
        />
      </Fade>
    </div>
    <Fade center delay={500} duration={2200}>
      <div className="sculpture-image-container">
        <div
          className="sculpture-image"
          style={{
            backgroundImage: `url(${sculptureStudio})`,
          }}
        />
      </div>
    </Fade>
    <Fade center delay={300} duration={2000}>
      <div className="drawing-image-container">
        <div
          className="drawing-image"
          style={{
            backgroundImage: `url(${drawingStudio})`,
          }}
        />
      </div>
    </Fade>
  </div>
);

export default Hero;
