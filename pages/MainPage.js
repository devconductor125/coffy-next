import JoinTeam from './JoinTeam';
import Homepage from './Homepage';
import Counters from './Counters';
import styled from 'styled-components';
import Header from './Header';
import ImageSlider from './ImageSlider';
import { useEffect } from 'react'
import Iphone3DComponent from './threeComponents/Iphone3DComponent';
// import teamWorkImage from '../assets/coffy-team-work-img.svg';


export default function MainPage() {

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            // Il codice qui dentro verrà eseguito solo lato client
            const scrollPosition = window.scrollY;
            let maxScroll = 850; // Cambia questo valore per regolare la posizione massima
            const iphoneElement = document.getElementById("iphoneFeedImage");
            let reductionFactor = 3; // Modifica questo valore per regolare la velocità di movimento
            let startPosition = 999; // Modifica questo valore per regolare il punto di inizio del movimento
    
            // Verifica se il dispositivo è mobile
            if(window.innerWidth <= 768) {
                // Modifica questi valori per regolare il comportamento su dispositivi mobile
                // maxScroll = 350; 
                // reductionFactor = 3.5;
                // startPosition = 200;
                return;
            }
    
            if (iphoneElement && scrollPosition > startPosition) {
              const newPosition = (scrollPosition - startPosition) / reductionFactor;
        
              if (newPosition <= maxScroll) {
                iphoneElement.style.transform = `translateY(${newPosition}px)`;
              } else {
                iphoneElement.style.transform = `translateY(${maxScroll}px)`;
              }
            }
          }
    };



    useEffect(() => {
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    

    return (
    <>
        <Header />
        <StyledMain>
            <div className='first'>
                <div className='home'>
                    <Homepage />
                </div>
                <StyledImage id="iphoneFeedImage">
                    {/* <img src={IphoneImage} alt="header" /> */}
                    <Iphone3DComponent />
                </StyledImage>

            </div>

            <ImageSlider />

            <Counters />


            <JoinTeam />

            {/* <img width={"100%"} src={teamWorkImage} alt={"ciao"} style={{marginTop: "50px"}} /> */}


            <FooterStyled id="rootFooter">
                <a href="https://www.iubenda.com/privacy-policy/20179740">Privacy & cookie policy</a>
                <p>Powered by Coffy®</p>
                <p>Copyright © 2023</p>
            </FooterStyled>
        </StyledMain>
    </>
        
    );
}
// create styled image component    
const StyledImage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 800px;
    width: 30vw;
    margin-top: -500px;
    img {
        width:25vw;
    }

    
    @media (max-width: 768px) {
        margin-top: 0;
        padding-right: 0;
        width: 100vw;
        img {
            width: 80vw;
        }
    }

    // add wide screen view
    @media (min-width: 2000px) {
        img {
            width:20vw;
        }
    }
`;
const StyledMain = styled.div`
    max-width: 100vw;
    background-color: black;
    z-index: 1000;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .first {    
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100vw;
        height: 1400px;
    }
    .home { 
        display: flex;
        width: 58vw;
        margin-left: 5vw;
    }

    // if not smartphone
    @media (min-width: 768px) {
        video {
            margin-top: 100px;
        }
    }

    // add smartphone view
    @media (max-width: 768px) {
        .first {
            flex-direction: column-reverse;
            align-items: center;
            margin-top: 150px;
        }
        .home {
            width: 100%;
            margin-left: 0;
        }
    }
`;
const FooterStyled = styled.footer`
  // background-image: linear-gradient(to top,grey,black);
  width: 100vw;
  background-color: black;
  opacity: 0.99;
  min-height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  p {
    color: white;
    font-size: 12px;
    // font-weight: bold;
  }
  a {
    color: white;
    font-size: 12px;

  }

  // media query for mobile
  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
    z-index: 10000;
  }
`;






