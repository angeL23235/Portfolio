import { useLanguage } from '../../contexts/LanguageContext';
import './Hero.css';
import profile from '../../assets/img/profile_portfolio.jpeg';
import cvFile from '../../../public/cv/CV_ML.pdf';

const Hero = () => {
  const { t } = useLanguage();

  const profileImage = profile;
  
  const cvPath = cvFile;

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-profile-wrapper">
          <div className="hero-profile-image-container">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="hero-profile-image"
            />
          </div>
        </div>

        <div className="hero-badge">
          <div className="hero-badge-content">
            <span className="hero-badge-text">
              👋 {t('heroDescription')}
            </span>
          </div>
        </div>
        <h1 className="hero-title">
          <span className="hero-title-gradient">
            {t('heroTitle')}
          </span>
        </h1>
        <p className="hero-subtitle">
          {t('heroSubtitle')}
        </p>
        <div className="hero-buttons">
          <a 
            href={cvPath} 
            download 
            className="hero-button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hero-button-primary-content">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('downloadCV')}
            </span>
            <span className="hero-button-primary-overlay"></span>
          </a>
          <a href="#projects" className="hero-button-secondary">
            {t('viewProjects')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
