import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RevealSection, RevealCard } from '../../hooks/useScrollReveal';
import './Projects.css';
import ProjectViewer from './ProjectViewer';
import traslappImage from '../../assets/projects/traslapp/Perfil.png';
import fudeaJurImage from '../../assets/projects/FudeaJur/TablaRegistrosFiltrados.png';

import traslappLogin from '../../assets/projects/traslapp/Login.png';
import traslappPerfil from '../../assets/projects/traslapp/Perfil.png';
import traslappCalificacion from '../../assets/projects/traslapp/CalificacionServicio.png';
import traslappReserva from '../../assets/projects/traslapp/ReservaHoteles.png';

import fudeaJurTabla from '../../assets/projects/FudeaJur/TablaRegistrosFiltrados.png';
import fudeaJurPaginado from '../../assets/projects/FudeaJur/PaginadoCustomizable.png';
import fudeaJurPrestadores from '../../assets/projects/FudeaJur/PrestadoresServicio.png'; 

const Projects = () => {
  const { t } = useLanguage();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerTitle, setViewerTitle] = useState('');

  const projects = [
    {
      title: t('project1Title'),
      description: t('project1Description'),
      image: traslappImage,
      gradientClass: 'project-gradient-blue',
      technologies: ['PHP', 'MySQL', 'CSS', 'JavaScript'],
      projectLink: 'https://traslapp-web.onrender.com',
      codeLink: 'https://github.com/angeL23235/complete',
      galleryImages: [traslappLogin, traslappPerfil, traslappCalificacion, traslappReserva]
    },
    {
      title: t('project2Title'),
      description: t('project2Description'),
      image: fudeaJurImage,
      gradientClass: 'project-gradient-purple',
      technologies: ['React', 'CSS', 'Postman'],
      projectLink: '#',
      codeLink: '#',
      galleryImages: [fudeaJurTabla, fudeaJurPaginado, fudeaJurPrestadores]
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
                  <button
                    onClick={() => {
                      if (project.projectLink && project.projectLink !== '#') {
                        window.open(project.projectLink, '_blank', 'noopener,noreferrer');
                      } else if (project.galleryImages && project.galleryImages.length > 0) {
                        setViewerImages(project.galleryImages);
                        setViewerTitle(project.title);
                        setViewerOpen(true);
                      }
                    }}
                    className="project-button-primary"
                  >
                    {project.projectLink && project.projectLink !== '#' ? (
                      <>
                        <i className="fas fa-external-link-alt"></i>
                        <span>{t('viewProject')}</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-images"></i>
                        <span>{t('viewProject')}</span>
                      </>
                    )}
                  </button>
                  {project.codeLink && project.codeLink !== '#' && (
                    <a 
                      href={project.codeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-button-secondary"
                    >
                      <i className="fab fa-github"></i>
                      <span>{t('viewCode')}</span>
                    </a>
                  )}
                </div>
              </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
      <ProjectViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={viewerImages}
        projectTitle={viewerTitle}
      />
    </RevealSection>
  );
};

export default Projects;
