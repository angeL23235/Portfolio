import { useLanguage } from '../../contexts/LanguageContext';
import { RevealSection, RevealCard } from '../../hooks/useScrollReveal';
import './Skills.css';

const Skills = () => {
  const { t } = useLanguage();

  const skillIcons = {
    'React': <i className="fab fa-react"></i>,
    'Tailwind CSS': <i className="fab fa-css3-alt"></i>,
    'HTML/CSS': <i className="fab fa-html5"></i>,
    'JavaScript': <i className="fab fa-js"></i>,
    'Node.js': <i className="fab fa-node"></i>,
    'Python': <i className="fab fa-python"></i>,
    'MongoDB': <i className="fas fa-database"></i>,
    'Git': <i className="fab fa-git-alt"></i>,
    'Postman': <i className="fas fa-paper-plane"></i>,
    'GitHub': <i className="fab fa-github"></i>,
    'Figma': <i className="fab fa-figma"></i>,
    'Vite': <i className="fas fa-bolt"></i>
  };

  const skillCategories = {
    frontend: {
      skills: ['React', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      icon: '💻',
      bgClass: 'skill-card-bg-blue'
    },
    backend: {
      skills: ['Node.js', 'Python', 'MongoDB'],
      icon: '⚙️',
      bgClass: 'skill-card-bg-purple'
    },
    tools: {
      skills: ['Git', 'Postman', 'GitHub', 'Figma', 'Vite'],
      icon: '🛠️',
      bgClass: 'skill-card-bg-indigo'
    }
  };

  return (
    <RevealSection id="skills" className="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">
            <span className="skills-title-gradient">
              {t('skillsTitle')}
            </span>
          </h2>
          <div className="skills-divider"></div>
        </div>
        <div className="skills-grid">
          {Object.entries(skillCategories).map(([category, data], index) => (
            <RevealCard key={category} delay={index * 150}>
              <div className="skill-card">
              <div className={`skill-card-bg ${data.bgClass}`}></div>
              <div className="skill-card-content">
                <div className="skill-icon">{data.icon}</div>
                <h3 className="skill-category">
                  {t(category)}
                </h3>
                <div className="skill-tags">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="skill-tag-wrapper">
                      <span className="skill-tag" data-skill={skill}>
                        <span className="skill-tag-icon">{skillIcons[skill]}</span>
                        <span className="skill-tag-text">{skill}</span>
                      </span>
                      <div className="skill-tooltip">
                        <span className="skill-tooltip-icon">{skillIcons[skill]}</span>
                        <span className="skill-tooltip-text">{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};

export default Skills;
