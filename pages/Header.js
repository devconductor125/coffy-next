import styled from 'styled-components';
import { useEffect } from 'react';
import Image from 'next/image';
const logo = '/assets/logo.PNG';
const appleLogo = '/assets/appleLogo.svg';
const playLogo = '/assets/playstoreLogo.svg';
const appIcon = '/assets/adaptive_appIcon.png';
const vector = '/assets/Vector.svg';


//create header component with background image
export default function Header() {

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = 550; // Cambia questo valore per regolare la posizione massima
    const intestationElement = document.getElementById("intestationDiv");
    const startPosition = 150; // Modifica questo valore per regolare il punto di inizio del movimento
    const startOpacityPosition = 150; // Modifica questo valore per regolare il punto di inizio dell'opacità
    const maxOpacity = 1; // Modifica questo valore per regolare l'opacità massima
    const maxBlur = 10; // Modifica questo valore per regolare l'intensità massima dello sfocatura
  
    if (intestationElement) {
      if (scrollPosition > startPosition) {
        const newPosition = (scrollPosition - startPosition);
  
        if (newPosition <= maxScroll) {
          if (scrollPosition > startOpacityPosition) {
            const opacity = maxOpacity - (newPosition / maxScroll) * maxOpacity;
            intestationElement.style.opacity = opacity;
  
            const blur = (newPosition / maxScroll) * maxBlur;
            intestationElement.style.filter = `blur(${blur}px)`;
          } else {
            intestationElement.style.opacity = maxOpacity;
            intestationElement.style.filter = `blur(0px)`;
          }
        }
        else {
          intestationElement.style.opacity = 0;
          intestationElement.style.filter = `blur(${maxBlur}px)`;
        }
      } else {
        // Quando la posizione di scorrimento è al di sopra della startPosition, 
        // ripristina l'opacità e la sfocatura ai valori iniziali
        intestationElement.style.opacity = maxOpacity;
        intestationElement.style.filter = `blur(0px)`;
      }
    }
  };
  

  useEffect(() => {
    const intestationElement = document.getElementById("intestationDiv");

    if (intestationElement) {
      intestationElement.addEventListener("animationend", () => {
        intestationElement.classList.remove("animated-intestation");
      });
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  return (
    <div>
      <StyledHeader>
      {/* autoplay styled video */}
     
        <div className="first-block"></div>
        <div className='logo-sub animated-intestation' id='intestationDiv' >

          <Logo src={logo} alt="logo" />

          <div className="subtitle-div">
            Join the Reality.
          </div>
          <Image 
          width={100}
          height={100}
          src={appIcon} className="app-icon" alt="app icon" />
          <div className="download-buttons">

            {/* write an if statement */}
              
              <button 
                  onClick={() => window.open('https://apps.apple.com/it/app/coffy/id6449869930', '_blank', 'noopener,noreferrer')}
                  disabled={false}
              >
                  <Image 
                  width={100}
                  height={100}
                  src={appleLogo} alt=""></Image>
              </button>
              <button 
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.coffyhouse.coffy', '_blank', 'noopener,noreferrer')}
                  disabled={false}
              >
                  <Image 
                  width={100}
                  height={100}
                  src={playLogo} alt=""></Image>
              
              </button>

        </div>
 

          <Image 
          width={300}
          height={100}
          src={vector} className="vector" alt="vector" />
        </div>
      </StyledHeader>
    </div>
  );
}


// create header styled component
const StyledHeader = styled.header`
z-index: 1000;

  background: 
    linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 107.69%), 
    linear-gradient(249.8deg, #2B8C35 0%, rgba(0, 0, 0, 0) 84.53%), 
      #000000;  
  padding-bottom: 80px; 
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  min-height: 100vh;

  @media (max-width: 768px) {
    background: 
    linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 107.69%), 
    linear-gradient(249.8deg, #2B8C35 0%, rgba(0, 0, 0, 0) 54.53%), 
      #000000;  
    min-height: 100vh;
  }

  .vector {
      margin-top: 50px;
      filter: invert(53%) sepia(90%) saturate(354%) hue-rotate(50deg) brightness(96%) contrast(90%);  }
  
  .app-logo { 
    border-radius: 20%;
    min-width: 100px;
    margin: 0 auto;
  }

  .logo-sub {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
   
    width: 100vw;
    z-index: 20; 
    margin-top: -50px;
  }

  .animated-intestation {
    animation: logoAppear 4s ease-in-out;
    animation-fill-mode: forwards;
  }


  .subtitle-div {
    padding-bottom: 10px;
    height: 100px;
    left: calc(50% - 905px/2 + 0.5px);
    font-style: normal;
    font-weight: 400;
    font-size: 110px;
    line-height: 148px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.02em;
    
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 260.07%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    @media (max-width: 768px) {
      margin-top: 50px;
      font-size: 70px;
      height: 150px;
      -webkit-align: top !important;
      line-height: 60px;
    }
  }
  
  .app-icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    margin-top: 20px;
  }

  .download-buttons {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      background: none;
      border: none;

      img {
        width: 40px;
        margin-right: 15px;
        margin-left: 15px;
      }
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 70px;
    height: 80px;
    -webkit-align: top !important;

    button {
      width: 50px;
      height: 50px;
      font-size: 30px;
      border-radius: 10px;
      margin-top: 20px;

      img {
        width: 20px;
      }
    }
  }
}
  .first-block {
    position: absolute;
    top: 0;
    left: 0;
    animation: logoAppear 4s ease-in-out;
    min-width: 100vw;
    z-index: 10;
    background: 
    radial-gradient(circle 600px at -25% 50%, #46B4BB, transparent),
    radial-gradient(circle 600px at 120% -5%, #0A95E2, transparent),
    #000000;

    
    @media (max-width: 768px) {
      background: radial-gradient(circle 300px at 120% -5%, #0A95E2, transparent), black;
    }
  }

  @media (max-width: 768px) {
    max-width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: top !important;
    justify-content: center;
    height: 0;
    position: relative;
    .sub-title {
      font-size: 30px;
    }

    .first-block {
      background-color: rgba(0,0,0,0.5);
      display: fixed;
    }
  }
`;

// create logo styled component
const Logo = styled.img`
  padding-top: 50px;
  height: 383px;
  pointer-events: none;
  padding-bottom: 0;
  margin-top: 0px;
  margin-bottom: -30px;

  // add smartphone view
  @media (max-width: 768px) {
    margin-top: 100px;
    height: 150px;
    -webkit-align: top !important; 
  }

  // add logo opacity on appear in 4 seconds animation and mantain opacity
  @keyframes logoAppear {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// create menu styled component
// eslint-disable-next-line
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-around;
  padding: 1vw;
  a {
    color: white;
    text-decoration: none;
    padding: 1vw;
  }
`;