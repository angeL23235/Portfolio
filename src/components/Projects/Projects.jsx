import { useLanguage } from '../../contexts/LanguageContext';
import { RevealSection, RevealCard } from '../../hooks/useScrollReveal';
import './Projects.css';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('project1Title'),
      description: t('project1Description'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      gradientClass: 'project-gradient-blue',
      technologies: ['React', 'Node.js', 'MongoDB'],
      projectLink: '#',
      codeLink: '#'
    },
    {
      title: t('project2Title'),
      description: t('project2Description'),
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
      gradientClass: 'project-gradient-purple',
      technologies: ['React', 'Tailwind CSS', 'Firebase'],
      projectLink: '#',
      codeLink: '#'
    },
    {
      title: t('project3Title'),
      description: t('project3Description'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      gradientClass: 'project-gradient-indigo',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
      projectLink: '#',
      codeLink: '#'
    }
  ];

  return (
    <RevealSection id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            <span className="projects-title-gradient">
              {t('projectsTitle')}
            </span>
          </h2>
          <div className="projects-divider"></div>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <RevealCard key={index} delay={index * 150}>
              <div className="project-card">
              <div className="project-image-container">
                <div className={`project-gradient ${project.gradientClass}`}></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-overlay-content">
                    <div className="project-tech-badges">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="project-tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">
                    {project.title}
                  </h3>
                  <div className="project-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <p className="project-description">
                  {project.description}
                </p>
                <div className="project-tech-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-buttons">
                  <a 
                    href={project.projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-button-primary"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>{t('viewProject')}</span>
                  </a>
                  <a 
                    href={project.codeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-button-secondary"
                  >
                    <i className="fab fa-github"></i>
                    <span>{t('viewCode')}</span>
                  </a>
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

export default Projects;
