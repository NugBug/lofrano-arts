import React from "react";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet";

import "./about.styles.scss";

const AboutPage = () => (
  <Fade delay={500}>
    <div className="about-page-container">
      <Helmet>
        <title>About James Lofrano</title>
        <meta
          name="description"
          content="'I am a native San Franciscan. My interest since childhood has always been in the visual arts. I attended the San Francisco Art Institute, graduating in 1976. I made my living working in our family business and we raised our children in the city. Once leaving the school environment I continued making art for my own pleasure and to fulfill my need to create. I create my art and follow the flow of inspiration whenever and wherever it took me.'"
        />
      </Helmet>
      <Fade left delay={500} duration={2000}>
        <div className="about-text">
          <p>
            I am a native San Franciscan. My interest since childhood has always
            been in the visual arts. I attended the San Francisco Art Institute,
            graduating in 1976.
          </p>
          <p>
            I made my living working in our family business and we raised our
            children in the city. Once leaving the school environment I
            continued making art for my own pleasure and to fulfill my need to
            create. I create my art and follow the flow of inspiration whenever
            and wherever it took me.
          </p>
          <p>
            My work studio is in my home where I find it very convenient to work
            at any time the creative urges arise. I work in a small studio with
            an outdoor deck which is in the back of my garden.
          </p>
        </div>
      </Fade>
      <div id="offset-about-text"></div>
    </div>
  </Fade>
);

export default AboutPage;
