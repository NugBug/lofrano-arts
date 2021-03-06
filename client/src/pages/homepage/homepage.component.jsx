import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./homepage.styles.scss";

const HomePage = () => (
  <div className="homepage">
    <Helmet>
      <title>Lofrano Arts - SF Art and Sculptures</title>
      <meta
        name="description"
        content="A universal flow of energy and creativity that connects all of us."
      />
    </Helmet>
    <Fade delay={500} duration={1000}>
      <div className="studio-art">
        <Fade top delay={500} duration={2000}>
          <div className="hero">
            <h1 className="hero-text">Lofrano Arts</h1>
          </div>
        </Fade>
        <div id="offset-hero"></div>
      </div>
    </Fade>
    <div className="hero-statement">
      <div className="hero-statement-text">
        <Fade duration={2000}>
          <p>
            I feel there is a universal flow of energy and creativity that
            connects all of us.
          </p>
          <div className="line-space"></div>
          <div className="line-space"></div>
          <hr></hr>
        </Fade>
        <Fade duration={2000}>
          <div className="line-space"></div>
          <div className="line-space"></div>
          <p>
            When I see something that resonates with me, I have a sensation that
            I am connecting with that flow. I have the need to respond, to
            interact with it in some way. It is that energy that inspires and
            motivates me to create my work. Be it my sculpture in various
            mediums, drawings or digital works, it all begins from the same
            spark. In my mind I see and experience the creation of the artwork
            as this energy directs and creates it.
          </p>
          <div className="line-space"></div>
          <div className="line-space"></div>
          <hr></hr>
        </Fade>
        <Fade duration={2000}>
          <div className="line-space"></div>
          <div className="line-space"></div>
          <p>
            My work is about manifesting that flow of energy using whatever it
            brings to me. I see and work unfiltered, listening and responding as
            I work, a direct encounter. Each cut in the wood, mark or line on a
            drawing brings another opportunity to respond, to connect, in that
            present moment, open to the flow. It is a stimulating conversation.
          </p>
        </Fade>
      </div>
    </div>
    <Fade duration={1000}>
      <div className="studio-sculpture">
        <div className="button-container">
          <Link className="explore-button" to="/gallery">
            Explore
          </Link>
        </div>
      </div>
    </Fade>
  </div>
);

export default HomePage;
