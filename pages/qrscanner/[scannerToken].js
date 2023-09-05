import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Webcam from "react-webcam";
import jsQR from "jsqr";
import styled from 'styled-components';
import axios from 'axios';
const logo = '/assets/Logo-black.PNG';
const logo2 = '/assets/logo.PNG';
const scannerImage = '/assets/Scan.svg';
const scannerImage2 = '/assets/Scan-green.svg';
const scannerImage3 = '/assets/Scan-red.svg';


const videoConstraints = {
  facingMode: { exact: "environment" }
};

const QRScanner = () => {
  const webcamRef = useRef(null);
  const [qrCode, setQRCode] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const router = useRouter();
  const { scannerToken } = router.query;

  useEffect(() => {
    if (!showCamera) return;

    const interval = setInterval(() => {
      scanQRCode();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [showCamera]);

  const scanQRCode = () => {
    const imageSrc = webcamRef?.current?.getScreenshot();

    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;


      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setQRCode(code.data);
        }
      };
    }
  };

  const handleReset = () => {
    setQRCode(null);
    setPopupMessage(null);
  };

  const handleAccessRegistration = async () => {
    if (!qrCode) {
      setPopupMessage(false);
      console.log("QR data not available!");
      return;
    }
  
    try {
      const qrData = JSON.parse(qrCode);
      console.log(qrData);

      if (!qrData) {
        console.log("Invalid QR data!");
        setPopupMessage(false);
        return;
      }
    
      if (!qrData.user_id || !qrData.event_id || !qrData.token) {
        console.log("Invalid QR data!");
        setPopupMessage(false);
        return;
      }

      const url = `https://api.coffy.world/open/scanTicket/${qrData.user_id}/${qrData.event_id}/${qrData.token}/${scannerToken}`;

      try {
        const response = await axios.put(url, {}, {
          headers: {
            'Content-Type': 'x-www-form-urlencoded'
          }
        });
        console.log(response.data);
        console.log("andato tutto ok");
        setPopupMessage(true);
        return;
      } catch (error) {
        console.error('There was a problem with the axios request:', error);
        setPopupMessage(false);
        return;
      }
    } catch (error) {
      setPopupMessage(false);
      console.error("Errore durante l'analisi JSON:", error);
    }
  }

  useEffect(() => {
      console.log("popupMessage ha cambiato valore:", popupMessage);
      setQRCode(null);
  }, [popupMessage]);

  return (
    <StyledScanner>
      {!showCamera && ( 
      <div className='initial-div'>
        <Logo src={logo} alt="logo" />
        <h1>Ticket scanner</h1>
        <p>Tap here to stamp the ticket</p>
        <button onClick={() => setShowCamera(true)}>
          Scan ticket
        </button>
      </div>
      )}
      {showCamera && (
        <div className='camera-div'>
          <Webcam
            audio={false}
            width={100 + '%'}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam-style" 
          />
          <div className='backgorund-scanner'>
            <Logo className='logo' src={logo2} alt="logo" />
              {popupMessage === null && 
              <div className='response'> <p>Place the ticket inside the box</p></div>}
              {popupMessage !== null && popupMessage === true && <div className='response valid-ticket'> 
                <div className='valid-res'>
                  <p>Ticekt valid</p>
                </div>
                <p>Ticket has been stamped</p>
              </div>}
              {popupMessage !== null && popupMessage === false && <div className='response invalid-ticket'>
                <div className='invalid-res'>
                  <p>Error</p>
                </div>
                <p>Ticket not valid, try again</p>
              </div>}
            <div className='qr-space'>
              <ScannerSpace className="scanner-image" src={popupMessage === null ? scannerImage : (popupMessage !== null && popupMessage === true) ? scannerImage2 : scannerImage3}  />
            </div>
            {popupMessage === null && qrCode && <div className='action-buttons'> 
              <button onClick={handleAccessRegistration}>
                Validate ticket
              </button>
              <button onClick={handleReset}
              style={{backgroundColor:"red"}}>
                Cancella
              </button>
            </div>}
            {popupMessage !== null && <button onClick={handleReset}>
                Next ticket
            </button> }
          </div>
        </div>
      )}
    </StyledScanner>
  );
};

const StyledScanner = styled.div`
  font-family: 'Nunito', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;

  button {
    height: 45px;
    font-size: 14px;
    border-radius: 50px;
    cursor: pointer; 
    width: 220px;
  }
  
  .initial-div {
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Nunito', sans-serif;

    p, h1 {
      color: black;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
    }
    p {
      font-size: 16px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 0;
      font-weight: 800;
    }

    button {
      color: white;
      background-color: black;
    }
  }
  
  .camera-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%; 
    min-height: 800px;
    overflow: hidden;

    video {
      min-width: 100%; 
      min-height: 800px; 

      /* Setting width & height to auto prevents the browser from stretching or squishing the video */
      width: auto;
      height: auto;

      /* Center the video */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }

  webcam-style {
    height: 100vh;
    min-height: 1800px;
  }

  .backgorund-scanner {
    padding-top: 50px;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .logo {
      height: 80px;
      z-index: 10000;
      margin-bottom: 50px;
    }
    button {
      margin-top: 50px;
      color: black;
      background-color: white;
    }
    .action-buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  
  .qr-space {
    height: 293px;
    width: 293px;
    border-radius: 35px;
    box-shadow: 0 0 0 99999px rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  .response {
    z-index: 10000;
    height: 28px;
    border-radius: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    margin-bottom: 50px;
    padding-left: 15px;
    padding-right: 15px;
    p {
      color: black;
      font-size: 12px;
    }
  }

  .valid-ticket {
    background-color: rgba(220, 250, 230);
    border: 1px solid rgb(171, 239, 198);
    padding-left: 5px;
    p {
      color: rgb(6, 118, 71);
    }

  .valid-res {
    border: 1px solid rgb(171, 239, 198);
    background-color: rgb(7, 148, 85);
    height: 20px;
    border-radius: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    p {
      color: white;
      font-size: 12px;
    }
  }
}

  .invalid-ticket {
    background-color: rgb(254, 228, 226);
    border: 1px solid rgb(254, 205, 202);
    padding-left: 5px;
    p {
      color: rgb(180, 35, 24);
    }

  .invalid-res {
    border: 1px solid rgb(254, 205, 202);
    background-color: rgb(217, 45, 32);
    height: 20px;
    border-radius: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    p {
      color: white;
      font-size: 12px;
    }
  }
`;

const ScannerSpace = styled.img`
  width: 300px;
  height: 300px;
`;

  // create logo styled component
const Logo = styled.img`
height: 200px;

// add smartphone view
@media (max-width: 768px) {
  height: 120px;
}
`;

export default QRScanner;
