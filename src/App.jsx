import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Sidebar from './components/Sidebar/Sidebar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ProjectDetails from './components/Projects/ProjectDetails';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <Sidebar />
          <div className="app-body">
            <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                  </>
                }
              />
              <Route path="/project/:projectId" element={<ProjectDetails />} />
            </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
