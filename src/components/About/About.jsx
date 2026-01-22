import { useLanguage } from '../../contexts/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">
            <span className="about-title-gradient">
              {t('aboutTitle')}
            </span>
          </h2>
          <div className="about-divider"></div>
        </div>
        <div className="about-content">
          <p className="about-description">
            {t('aboutDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
