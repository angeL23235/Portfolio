import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './Sidebar.css';

const FlagIcon = ({ country }) => {
  if (country === 'es') {
    return (
      <svg className="sidebar-flag" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="160" fill="#AA151B" />
        <rect y="160" width="640" height="160" fill="#F1BF00" />
        <rect y="320" width="640" height="160" fill="#AA151B" />
      </svg>
    );
  }

  return (
    <svg className="sidebar-flag" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="sidebar-flag-clip">
          <path fillOpacity=".7" d="M-85.3 0h682.6v512h-682.6z" />
        </clipPath>
      </defs>
      <g clipPath="url(#sidebar-flag-clip)" transform="translate(80) scale(.94)">
        <g strokeWidth="1pt">
          <path fill="#006" d="M-256 0H768v512H-256z" />
          <path fill="#fff" d="M-256 0v57.2l909.1 454.6h909.1V0H-256zM768 0v57.2L-141.1 512H-256V454.8L653.2 0H768z" fillRule="evenodd" />
          <path fill="#fff" d="M170.6 0v512h170.7V0H170.6zM-256 170.7v170.6H768V170.7H-256z" fillRule="evenodd" />
          <path fill="#c00" d="M-256 204.8v102.4H768V204.8H-256zM170.6 0v512h102.4V0H170.6zM-256 512L85.3 341.3h76.4L-179.7 512H-256zm0-512L85.3 170.7H8.9L-256 38.2V0zm909.1 512L567.8 341.3h-76.4L653.2 512h76.4zm0-512L567.8 170.7h67.7L768 38.2V0z" fillRule="evenodd" />
        </g>
      </g>
    </svg>
  );
};

const navItems = [
  { id: 'home', icon: 'fa-house', labelKey: 'home' },
  { id: 'about', icon: 'fa-user', labelKey: 'about' },
  { id: 'skills', icon: 'fa-code', labelKey: 'skills' },
  { id: 'projects', icon: 'fa-folder-open', labelKey: 'projects' },
  { id: 'contact', icon: 'fa-envelope', labelKey: 'contact' },
];

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem('sidebar-collapsed') === 'true'
  );
  const [activeSection, setActiveSection] = useState('home');
  const languageRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('sidebar-collapsed', isCollapsed);
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));

    return () => document.documentElement.classList.remove('sidebar-collapsed');
  }, [isCollapsed]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return undefined;

    const sectionIds = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const scrollToSection = (sectionId) => {
    const goToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(goToSection, 150);
    } else {
      goToSection();
    }

    setActiveSection(sectionId);
    setIsMobileOpen(false);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'en', name: 'English', flag: 'en' },
  ];

  return (
    <>
      <button
        type="button"
        className="sidebar-mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isMobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      <aside
        className={[
          'sidebar',
          isMobileOpen ? 'sidebar--open' : '',
          isCollapsed ? 'sidebar--collapsed' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="sidebar-glass">
          <div className="sidebar-inner">
            <div className="sidebar-chrome" aria-hidden="true">
              <span className="sidebar-dot sidebar-dot--red" />
              <span className="sidebar-dot sidebar-dot--yellow" />
              <span className="sidebar-dot sidebar-dot--green" />
            </div>

            <button
              type="button"
              className="sidebar-logo"
              onClick={() => scrollToSection('home')}
            >
            </button>

            <div className="sidebar-divider" />

            <p className="sidebar-section-label">{t('sidebarMenu')}</p>

            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  title={t(item.labelKey)}
                >
                  <span className="sidebar-nav-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </span>
                  <span className="sidebar-nav-label">{t(item.labelKey)}</span>
                </button>
              ))}
            </nav>

            <div className="sidebar-divider" />

            <div className="sidebar-footer">
              <div className="sidebar-language" ref={languageRef}>
                <button
                  type="button"
                  className="sidebar-control-btn"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  aria-label="Select language"
                  title={language === 'es' ? 'Español' : 'English'}
                >
                  <FlagIcon country={language} />
                  <span className="sidebar-control-label">
                    {language === 'es' ? 'Español' : 'English'}
                  </span>
                  <i className={`fas fa-chevron-down sidebar-chevron ${isLanguageOpen ? 'open' : ''}`} />
                </button>

                {isLanguageOpen && (
                  <div className="sidebar-language-menu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        className={`sidebar-language-option ${language === lang.code ? 'active' : ''}`}
                        onClick={() => handleLanguageSelect(lang.code)}
                      >
                        <FlagIcon country={lang.flag} />
                        <span>{lang.name}</span>
                        {language === lang.code && <i className="fas fa-check"></i>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="sidebar-control-btn"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? t('darkMode') : t('lightMode')}
                title={theme === 'light' ? t('darkMode') : t('lightMode')}
              >
                <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                <span className="sidebar-control-label">
                  {theme === 'light' ? t('darkMode') : t('lightMode')}
                </span>
              </button>

              <button
                type="button"
                className="sidebar-collapse-btn"
                onClick={() => setIsCollapsed((prev) => !prev)}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <i className={`fas ${isCollapsed ? 'fa-angles-right' : 'fa-angles-left'}`}></i>
                <span className="sidebar-control-label">
                  {isCollapsed ? t('sidebarExpand') : t('sidebarCollapse')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
};

export default Sidebar;
