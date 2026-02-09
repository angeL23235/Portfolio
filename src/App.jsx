import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import SectionBackground from './components/SectionBackground/SectionBackground';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import background1 from './assets/backgrounds/background1.jpg';
import background2 from './assets/backgrounds/background2.jpg';

function App() {
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);

  const sectionBackgrounds = [
    {
      id: 'home',
      image: background1
    },
    {
      id: 'about',
      image: background1
    },
    {
      id: 'projects',
      image: background1
    },
    {
      id: 'skills',
      image: background2
    },
    {
      id: 'contact',
      image: background2
    }
  ];

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <SectionBackground 
            sections={sectionBackgrounds} 
            onBackgroundChange={setActiveBackgroundIndex}
          />
          <AnimatedBackground activeBackgroundIndex={activeBackgroundIndex} />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
