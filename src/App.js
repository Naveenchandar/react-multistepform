import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import ScrollAnimation from 'react-animate-on-scroll';
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  return (
    <Container className="App" style={location.pathname === '/stepthree' ? {height:'400px'} : {height: '700px'}}>
      <ScrollAnimation delay={1000}
        animateIn='fadeInDown'
        initiallyVisible={true}>
        <h2 className="title"> CREATE NEW ACCOUNT</h2>
      </ScrollAnimation>
      <NavBar />
    </Container>
  );
}

export default App;
