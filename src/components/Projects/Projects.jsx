import { useLanguage } from '../../contexts/LanguageContext';
import './Projects.css';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('project1Title'),
      description: t('project1Description'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      gradientClass: 'project-gradient-blue'
    },
    {
      title: t('project2Title'),
      description: t('project2Description'),
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
      gradientClass: 'project-gradient-purple'
    },
    {
      title: t('project3Title'),
      description: t('project3Description'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      gradientClass: 'project-gradient-indigo'
    }
  ];

  return (
    <section id="projects" className="projects">
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
            <div key={index} className="project-card">
              <div className="project-image-container">
                <div className={`project-gradient ${project.gradientClass}`}></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay"></div>
              </div>
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">
                  {project.description}
                </p>
                <div className="project-buttons">
                  <button className="project-button-primary">
                    {t('viewProject')}
                  </button>
                  <button className="project-button-secondary">
                    {t('viewCode')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
