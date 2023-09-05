
// import styled components
import styled from 'styled-components';
// import MainRouter from './components/MainRouter';
// import Header from './components/Header';
import React from 'react';
// import ReducedHeader from './recruitmentComponents/ReducedHeader';
import { useEffect } from 'react';
// import switch and route from react-router-dom
import MainRouter from './MainPage';



function App({ data }) {

  // const [dispHeader, setDispHeader] = useState(true);

  useEffect(() => {

    // Esegui le modifiche desiderate qui quando il percorso cambia
    // console.log('Il percorso è cambiato:', location.pathname);
    
    // if url contains recruitment, render recruitment router
    // if (location.pathname === '/') {
    //   setDispHeader(false);
    // } else {
    //   setDispHeader(true);
    // }

    // change body color if path is recruitment
    // if (location.pathname === '/') {
    //   document.body.style.backgroundColor = 'black';
    // } else {
    //   document.body.style.backgroundColor = 'white';
    // }
  }, [])

  // const userChoices = {}


  return (
    <div>

      {/* {dispHeader === false ? null : <ReducedHeader id="reducedHeader" />} */}
      <Main>
        {/* Main website routes */}
        <MainRouter />

      </Main>



    </div>
  );
}

// create main styled component
const Main = styled.main`
// insert font sf pro rounded
  width: 100vw;
  color: #323233;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// create footer styled component


const LoadingSpinner = () => {
  return <StyledLoadingSpinner></StyledLoadingSpinner>;
};

const StyledLoadingSpinner = styled.div`
border: 4px solid rgba(0, 0, 0, 0.1);
width: 36px;
height: 36px;
border-radius: 50%;
border-left-color: #000;
animation: spin 1s linear infinite;
z-index: 10000;

@keyframes spin {
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
}
`;



export default App;
export { LoadingSpinner };
