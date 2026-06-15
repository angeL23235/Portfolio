import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);

  const project = location.state?.project;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!project || !project.imagesForViewer || project.imagesForViewer.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.imagesForViewer.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [project]);

  if (!project) {
    return (
      <section className="project-details">
        <div className="project-details-container">
          <p className="project-details-missing">
            {t('projectNotFound') || 'No se encontraron detalles para este proyecto.'}
          </p>
          <button
            className="project-details-back-button"
            onClick={() => navigate('/')}
          >
            {t('backToProjects') || 'Volver a proyectos'}
          </button>
        </div>
      </section>
    );
  }

  const images = project.imagesForViewer;

  let titleKey = '';
  let descriptionKey = '';
  let participationRows = project.participation || [];

  if (projectId === 'traslapp') {
    titleKey = 'project1Title';
    descriptionKey = 'project1Description';
    participationRows = [
      {
        area: t('project1Row1Area'),
        contribution: t('project1Row1Contribution'),
        tech: t('project1Row1Tech')
      },
      {
        area: t('project1Row2Area'),
        contribution: t('project1Row2Contribution'),
        tech: t('project1Row2Tech')
      },
      {
        area: t('project1Row3Area'),
        contribution: t('project1Row3Contribution'),
        tech: t('project1Row3Tech')
      }
    ];
  } else if (projectId === 'fudeajur') {
    titleKey = 'project2Title';
    descriptionKey = 'project2Description';
    participationRows = [
      {
        area: t('project2Row1Area'),
        contribution: t('project2Row1Contribution'),
        tech: t('project2Row1Tech')
      },
      {
        area: t('project2Row2Area'),
        contribution: t('project2Row2Contribution'),
        tech: t('project2Row2Tech')
      },
      {
        area: t('project2Row3Area'),
        contribution: t('project2Row3Contribution'),
        tech: t('project2Row3Tech')
      }
    ];
  } else if (projectId === 'cobros-deudas') {
    titleKey = 'project3Title';
    descriptionKey = 'project3Description';
    participationRows = [
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
    ];
  }

  const resolvedTitle = titleKey ? t(titleKey) : project.title;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : project.description;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="project-details">
      <div className="project-details-container">
        <button
          className="project-details-back-button"
          onClick={() => navigate('/')}
          aria-label={t('backToProjects') || 'Volver a proyectos'}
        >
          <i className="fas fa-arrow-left-long"></i>
        </button>

        <header className="project-details-header">
          <div className="project-details-header-card">
            <div className="project-details-title-row">
              <h1 className="project-details-title">{resolvedTitle}</h1>
              {project.status && (
                <span className="project-status-badge">{project.status}</span>
              )}
            </div>
            <p className="project-details-description">{resolvedDescription}</p>
          </div>
        </header>

        {images && images.length > 0 && (
          <section className="project-details-gallery">
            <div className="project-details-carousel">
              {images.length > 1 && (
                <button
                  className="project-details-nav project-details-nav-prev"
                  onClick={handlePrevious}
                  aria-label="Imagen anterior"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}

              <div className="project-details-slide-container">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`project-details-slide ${
                      index === currentIndex ? 'active' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Imagen ${index + 1}`}
                      className="project-details-image"
                    />
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <button
                  className="project-details-nav project-details-nav-next"
                  onClick={handleNext}
                  aria-label="Imagen siguiente"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </div>

            {images.length > 1 && (
              <div className="project-details-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`project-details-dot ${
                      index === currentIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {participationRows && participationRows.length > 0 && (
          <section className="project-details-participation">
            <h2 className="project-details-subtitle">
              {t('projectParticipationTitle') || 'Participación'}
            </h2>
            <div className="project-details-table-wrapper">
              <table className="project-details-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('projectParticipationArea') || 'Área'}</th>
                    <th>{t('projectParticipationContribution') || 'Contribución'}</th>
                    <th>{t('projectParticipationTech') || 'Tecnologías'}</th>
                  </tr>
                </thead>
                <tbody>
                  {participationRows.map((item, index) => (
                    <tr key={index}>
                      <td className="project-details-index-cell">{index + 1}</td>
                      <td>{item.area}</td>
                      <td>{item.contribution}</td>
                      <td>{item.tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;

