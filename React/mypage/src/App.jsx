import React from 'react';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import ScrollToTop from './ScrollToTop';
import './App.css';


const App = () => {
  return (
    <div>
      <Nav />
      <Home />
      <About />
      <Services />
      <Contact />
      <ScrollToTop />
    </div>
  );
}

export default App;
