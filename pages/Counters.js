import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';

function Counters() {

    const ref = useRef();
    const [usersCounter, setUsersCounter] = useState(0);
    const [eventsCounter, setEventsCounter] = useState(0);

    useEffect(() => {
        const fetchUsersNumber = async () => {
            try {
                const response = await axios.get('https://api.coffy.world/auth/count');
                setUsersCounter(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchEventsNumber = async () => {
            try {
                const response = await axios.get('https://api.coffy.world/auth/eventsCount');
                setEventsCounter(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchData = async () => {
            await fetchUsersNumber();
            await fetchEventsNumber();
        };

        

        let intervalId; // ogni 15 secondi

        // Pulizia alla disattivazione del componente

        const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                // Aggiungi qui il codice da eseguire quando il componente è visibile
                intervalId = setInterval(fetchData, 15000)
                fetchData();
              }
            },
            {
              root: null,
              rootMargin: '0px',
              threshold: 0.1
            }
          );
      
          if (ref.current) {
            observer.observe(ref.current);
          }
      
          return () => {
            if (ref.current) {
              // eslint-disable-next-line
              observer.unobserve(ref.current);
            }
            clearInterval(intervalId);
          };
        }, []); 

    return (
        <StyledCounters ref={ref}>
            <div className="counter">
                <div className="first-counter"><Counter targetNumber={usersCounter} /></div>
                <div className="second-counter">users</div>
                <div className="third-counter">now active</div>
            </div>
            <div>
                <div className="first-counter"><Counter targetNumber={eventsCounter} /></div>
                <div className="second-counter">events</div>
                <div className="third-counter">already created</div>
            </div>
        </StyledCounters>
    );
}



function Counter({ targetNumber }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval;

    const updateCounter = () => {
      setCounter((prevCounter) => {
        let nextCounter = prevCounter;
        let speed = 1; // 1ms di default
    
        if (prevCounter < targetNumber) {
          nextCounter = prevCounter + 1;
        } else if (prevCounter > targetNumber) {
          nextCounter = prevCounter - 1;
        }
        
        if (nextCounter >= (targetNumber * 3/4)) {
          // Aumentiamo l'intervallo di tempo per rallentare l'incremento
          // Utilizziamo una funzione esponenziale per un rallentamento significativo
          // Riduciamo la velocità di cambiamento aggiungendo una costante al denominatore
          speed = Math.pow((nextCounter - (targetNumber * 3/4)), 1.2) / 100;
          speed = Math.max(speed, 100);
        }
    
        if (interval) {
          clearInterval(interval);
        }
    
        // Impostiamo il nuovo intervallo con la velocità calcolata
        interval = setInterval(updateCounter, speed);
    
        return nextCounter;
      });
    };

    // Iniziamo il primo intervallo
    interval = setInterval(updateCounter, 1);
    
    return () => clearInterval(interval);
  }, [targetNumber]);




  

  return <div>{counter}</div>;
}



// Join the team subscribe wrapper
const StyledCounters = styled.div`
    height: 1650px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    background: linear-gradient(180deg, black 0%, #6AB12F 31.25%, #2B8C35 63.02%, #FFFFFF 100%);

    
    .counter {
        margin-bottom: 200px;
    }

    .first-counter {
        -webkit-font-smoothing: subpixel-antialiased;
        font-weight: 800;
        font-size: 444px;
        line-height: 290px;
        letter-spacing: -30px;
        padding: 20px;
        background: linear-gradient(white, white, transparent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .second-counter {
        margin-top: -100px;
        font-style: normal;
        font-size: 200px;
        line-height: 200px;
        letter-spacing: -10px;
    }
    .third-counter {
        color: black;
        font-style: normal;
        font-size: 60px;
        line-height: 64px;
    }

    @media (max-width: 768px) {
        height: 100vh;
        .counter {
            margin-bottom: 100px;
        }
        
        .first-counter {
            font-size: 200px;
            line-height: 200px;
            letter-spacing: -10px;
        }
        .second-counter {
            margin-top: -100px;
            font-size: 100px;
            line-height: 100px;
            letter-spacing: -5px;
        }
        .third-counter {
            font-size: 30px;
            line-height: 32px;
        }
    }
`;

export default Counters;