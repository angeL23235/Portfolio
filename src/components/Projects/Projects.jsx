import { useLanguage } from '../../contexts/LanguageContext';
import { RevealSection, RevealCard } from '../../hooks/useScrollReveal';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
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
  const navigate = useNavigate();

  const projects = [
    {
      id: 'traslapp',
      title: t('project1Title'),
      description: t('project1ShortDescription'),
      fullDescription: t('project1Description'),
      image: traslappImage,
      technologies: ['PHP', 'MySQL', 'CSS', 'JavaScript'],
      projectLink: 'https://traslapp-web.onrender.com',
      codeLink: 'https://github.com/angeL23235/complete',
      galleryImages: [traslappLogin, traslappPerfil, traslappCalificacion, traslappReserva],
      participation: [
        {
          area: 'Backend PHP',
          contribution: 'Diseño y desarrollo de endpoints para registro, login, reservas y calificación de servicios.',
          tech: 'PHP, MySQL, arquitectura MVC básica'
        },
        {
          area: 'Frontend',
          contribution: 'Maquetación y estilos de los módulos de perfil, reservas y calificaciones.',
          tech: 'HTML, CSS, JavaScript'
        },
        {
          area: 'Base de datos',
          contribution: 'Modelado de tablas para usuarios, servicios, reservas y calificaciones.',
          tech: 'MySQL'
        }
      ]
    },
    {
      id: 'fudeajur',
      title: t('project2Title'),
      description: t('project2ShortDescription'),
      fullDescription: t('project2Description'),
      image: fudeaJurImage,
      technologies: ['React', 'CSS', 'Postman'],
      projectLink: '#',
      codeLink: '#',
      galleryImages: [fudeaJurTabla, fudeaJurPaginado, fudeaJurPrestadores],
      participation: [
        {
          area: 'Frontend React',
          contribution: 'Construcción de tablas filtradas y paginadas para gestión de registros.',
          tech: 'React, hooks personalizados'
        },
        {
          area: 'Integración API',
          contribution: 'Consumo y prueba de endpoints con Postman para asegurar la correcta comunicación.',
          tech: 'Postman, REST API'
        },
        {
          area: 'UI/UX',
          contribution: 'Diseño de interfaz limpia y enfocada en la lectura de datos.',
          tech: 'CSS modular'
        }
      ]
    },
    {
      id: 'cobros-deudas',
      title: t('project3Title'),
      description: t('project3ShortDescription'),
      fullDescription: t('project3Description'),
      status: t('project3Status'),
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
      technologies: ['Node.js', 'Prisma', 'JavaScript', 'React', 'PostgreSQL'],
      projectLink: '#',
      codeLink: '#',
      galleryImages: [],
      participation: [
        {
          area: t('project3Row1Area'),
          contribution: t('project3Row1Contribution'),
          tech: t('project3Row1Tech')
        },
        {
          area: t('project3Row2Area'),
          contribution: t('project3Row2Contribution'),
          tech: t('project3Row2Tech')
        },
        {
          area: t('project3Row3Area'),
          contribution: t('project3Row3Contribution'),
          tech: t('project3Row3Tech')
        }
      ]
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
            <RevealCard key={project.id || index} delay={index * 150}>
              <div className="project-card">
              <div className="project-image-container">
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
                  <div className="project-title-group">
                    <h3 className="project-title">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="project-status-badge">{project.status}</span>
                    )}
                  </div>
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
                  {project.projectLink && project.projectLink !== '#' && (
                    <button
                      onClick={() => {
                        window.open(project.projectLink, '_blank', 'noopener,noreferrer');
                      }}
                      className="project-button-primary"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>{t('viewProject')}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const imagesToUse =
                        project.galleryImages && project.galleryImages.length > 0
                          ? project.galleryImages
                          : [project.image];

                      navigate(`/project/${project.id}`, {
                        state: {
                          project: {
                            ...project,
                            description: project.fullDescription || project.description,
                            imagesForViewer: imagesToUse
                          }
                        }
                      });
                    }}
                    className={
                      project.projectLink && project.projectLink !== '#'
                        ? 'project-button-secondary'
                        : 'project-button-primary'
                    }
                  >
                    <i className="fas fa-list-ul"></i>
                    <span>{t('viewDetails')}</span>
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
    </RevealSection>
  );
};

export default Projects;
