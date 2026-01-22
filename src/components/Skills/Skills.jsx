import { useLanguage } from '../../contexts/LanguageContext';
import './Skills.css';

const Skills = () => {
  const { t } = useLanguage();

  const skillIcons = {
    'React': '⚛️',
    'Tailwind CSS': '🎨',
    'HTML/CSS': '🌐',
    'JavaScript': '📜',
    'Node.js': '🟢',
    'Python': '🐍',
    'MongoDB': '🍃',
    'Git': '📦',
    'Postman': '📮',
    'GitHub': '🐙',
    'Figma': '🎭',
    'Vite': '⚡'
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
    <section id="skills" className="skills">
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
          {Object.entries(skillCategories).map(([category, data]) => (
            <div key={category} className="skill-card">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
