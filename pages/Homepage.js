import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

export default function Homepage() {
  const ScrollingText = ({ children }) => {
    const textRef = useRef();
    const [color, setColor] = useState("rgb(255,255,255)"); // Inizialmente impostato al bianco

    useEffect(() => {
      const checkScroll = () => {
        const textPosition = textRef.current.getBoundingClientRect().top;
        const textHeight = textRef.current.offsetHeight;
        const screenPosition = window.innerHeight / 2;
        const distance = Math.abs(
          textPosition + textHeight / 2 - screenPosition
        ); // Distanza dal centro

        // Calcola il livello di grigio basato sulla distanza dal centro dello schermo.
        // Modifica 400 per controllare la velocità della sfumatura.
        const grayLevel =
          255 - Math.min(255, Math.max(0, Math.round((distance / 400) * 255)));

        setColor(`rgb(${grayLevel}, ${grayLevel}, ${grayLevel})`);
      };

      window.addEventListener("scroll", checkScroll);

      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
    }, []);

    return (
      <StyledScrollingText>
        <div ref={textRef} className="scrolling-text" style={{ color: color }}>
          {children}
        </div>
      </StyledScrollingText>
    );
  };

  return (
    <StyledHome>
      <div>
        <ScrollingText>
          Create events for every activity and share them with whoever you want
        </ScrollingText>
        <ScrollingText>
          Find out in advance what your friends are doing (or your ex, we
          don&apos;t care)
        </ScrollingText>
        <ScrollingText>
          Who? What? When? Where? <br /> You and the other participants have
          everything at your fingertips
        </ScrollingText>
        <ScrollingText>
          Keep your most cherished or quirky memories on your profile. Peek at
          others&apos; public memories (but let&apos;s keep the judgments on the
          shelf)
        </ScrollingText>
        <ScrollingText>Be more social, but in real life</ScrollingText>
      </div>
    </StyledHome>
  );
}
//create styled component
const StyledHome = styled.div`
  z-index: -10;
  width: 100vw;
  z-index: 10;
  color: white;
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
  h2 {
    padding: 0;
  }

  h3 {
    // font-weight: 300;
    font-size: 20px;
  }

  h4 {
    // font weight thin
    font-size: 16px;
  }

  // add smartphone view
  @media (max-width: 768px) {
    width: 100vw;
    margin-top: 0px;
    h1,
    h2 {
      padding-left: 20px;
      padding-right: 20px;
      text-align: center;
    }
    p {
      margin-top: 0.5rem;
    }
  }
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1%;
    margin-right: 3%;

    // add smartphone view
    @media (max-width: 768px) {
      margin-right: 0;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
  .box {
    width: 25%;
    min-width: 180px;
    height: 180px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    border: 3px solid #e6e6e6;
    border-radius: 10px;
    padding: 1%;
    margin: 1%;
    //add professional bottom shadow
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3);

    // on hover friendly animation
    &:hover {
      transform: scale(1.05);
      transition: 0.3s;
      background-color: rgb(255, 255, 255, 0.2);
    }

    // add smartphone view
    @media (max-width: 768px) {
      padding: 0;
      flex-direction: column;
      align-items: center;
      width: 45%;
      margin: 5px;
      min-width: 0px;
    }
  }
`;
const StyledScrollingText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 3.2vw;
  line-height: 3.2vw;

  display: flex;
  align-items: center;
  letter-spacing: -1.5px;
  margin-bottom: 130px;
  width: 55vw;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    font-size: 40px;
    line-height: 40px;
    width: 90vw;
    margin-bottom: 70px;
  }
`;
