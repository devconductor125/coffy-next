import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
const firstImage = "/assets/Feed.jpg";
const secondImage = "/assets/Event.jpg";
const thirdImage = "/assets/Create.jpg";
const fourthImage = "/assets/Profile.jpg";

function ImageSlider() {
  const imageSliderRef1 = useRef(null);
  const imageSliderRef2 = useRef(null);
  const imageSliderRef3 = useRef(null);
  const imageSliderRef4 = useRef(null);

  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    setOffsetTop(imageSliderRef1.current.offsetTop - window.innerHeight * 0.9);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const rotationFactor = 65;

      const scrollOffset = document.documentElement.scrollTop - offsetTop;

      [
        imageSliderRef1,
        imageSliderRef2,
        imageSliderRef3,
        imageSliderRef4,
      ].forEach((imageSliderRef, index) => {
        if (imageSliderRef.current) {
          const rotation = -scrollOffset / rotationFactor + 11 + index;
          const translateX = -scrollOffset + 800;

          imageSliderRef.current.style.transform = `rotate(${rotation}deg) translateX(${translateX}px)`;
        }
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetTop]);

  return (
    <StyledImageSlider>
      <div className="image-slider" ref={imageSliderRef1}>
        <Image width={100} height={100} src="/assets/Feed.jpg" alt="" />
      </div>
      <div className="image-slider" ref={imageSliderRef2}>
        <Image width={100} height={100} src={secondImage} alt="" />
      </div>
      <div className="image-slider" ref={imageSliderRef3}>
        <Image width={100} height={100} src={thirdImage} alt="" />
      </div>
      <div className="image-slider" ref={imageSliderRef4}>
        <Image width={100} height={100} src={fourthImage} alt="" />
      </div>
    </StyledImageSlider>
  );
}

const StyledImageSlider = styled.div`
  overflow: hidden;
  width: 100vw;
  padding-top: 10vh;
  background: linear-gradient(to bottom, black, black, black);
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .image-slider {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    will-change: transform;
  }

  .image-slider img {
    border-radius: 30px;
    scroll-snap-align: start;
    height: 70vh;
    width: auto;
    margin-right: 3vw;
  }

  @media (max-width: 768px) {
    margin-top: 150px;
    .image-slider img {
      width: auto;
      height: 70vh;
      margin: 0vw;
      margin-right: 3vw;
    }
  }
`;

export default ImageSlider;
