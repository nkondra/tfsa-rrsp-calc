import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import HeaderBar from './components/HeaderBar';
import CalculatorForm from './components/CalculatorForm';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Lato', sans-serif;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

const Calculator = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  border-radius: 0.5rem;
  margin: 10vh auto;
  box-shadow: 5px 8px 22px -8px;
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Calculator>
          <HeaderBar />
          <CalculatorForm />
        </Calculator>
      </>
    );
  }
}

export default App;
