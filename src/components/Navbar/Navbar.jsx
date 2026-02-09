import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const FlagIcon = ({ country }) => {
    if (country === 'es') {
      return (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="160" fill="#AA151B"/>
          <rect y="160" width="640" height="160" fill="#F1BF00"/>
          <rect y="320" width="640" height="160" fill="#AA151B"/>
        </svg>
      );
    } else {
      return (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="a">
              <path fillOpacity=".7" d="M-85.3 0h682.6v512h-682.6z"/>
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="translate(80) scale(.94)">
            <g strokeWidth="1pt">
              <path fill="#006" d="M-256 0H768v512H-256z"/>
              <path fill="#fff" d="M-256 0v57.2l909.1 454.6h909.1V0H-256zM768 0v57.2L-141.1 512H-256V454.8L653.2 0H768z" fillRule="evenodd"/>
              <path fill="#fff" d="M170.6 0v512h170.7V0H170.6zM-256 170.7v170.6H768V170.7H-256z" fillRule="evenodd"/>
              <path fill="#c00" d="M-256 204.8v102.4H768V204.8H-256zM170.6 0v512h102.4V0H170.6zM-256 512L85.3 341.3h76.4L-179.7 512H-256zm0-512L85.3 170.7H8.9L-256 38.2V0zm909.1 512L567.8 341.3h-76.4L653.2 512h76.4zm0-512L567.8 170.7h67.7L768 38.2V0z" fillRule="evenodd"/>
            </g>
          </g>
        </svg>
      );
    }
  };

  const languages = [
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'en', name: 'English', flag: 'en' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <button
              onClick={() => scrollToSection('home')}
              className="navbar-logo-button"
            >
              <span className="navbar-logo-desktop">Portfolio</span>
              <span className="navbar-logo-mobile">Angel</span>
            </button>
          </div>

          <div className="navbar-menu">
            <button
              onClick={() => scrollToSection('home')}
              className="navbar-menu-button"
            >
              {t('home')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="navbar-menu-button"
            >
              {t('about')}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="navbar-menu-button"
            >
              {t('skills')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="navbar-menu-button"
            >
              {t('projects')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="navbar-menu-button"
            >
              {t('contact')}
            </button>
          </div>

          <div className="navbar-controls">
            <div className="navbar-language-dropdown" ref={languageDropdownRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="navbar-language-button"
                aria-label="Select language"
              >
                <span>
                  <FlagIcon country={language} />
                </span>
                <span>{language === 'es' ? 'ES' : 'EN'}</span>
                <svg 
                  className={`navbar-language-arrow ${isLanguageDropdownOpen ? 'open' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLanguageDropdownOpen && (
                <div className="navbar-language-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`navbar-language-option ${language === lang.code ? 'active' : ''}`}
                    >
                      <FlagIcon country={lang.flag} />
                      <span>{lang.name}</span>
                      {language === lang.code && (
                        <svg className="navbar-language-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="navbar-theme-button"
              aria-label={theme === 'light' ? t('darkMode') : t('lightMode')}
            >
              {theme === 'light' ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="navbar-mobile-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(90deg)', transition: 'transform 0.3s ease' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <button
            onClick={() => scrollToSection('home')}
            className="navbar-mobile-menu-button"
          >
            {t('home')}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="navbar-mobile-menu-button"
          >
            {t('about')}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="navbar-mobile-menu-button"
          >
            {t('skills')}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="navbar-mobile-menu-button"
          >
            {t('projects')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="navbar-mobile-menu-button"
          >
            {t('contact')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
