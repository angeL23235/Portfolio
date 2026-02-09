import { useEffect, useState } from 'react';
import './ProjectViewer.css';

const ProjectViewer = ({ isOpen, onClose, images, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('keydown', handleArrowKeys);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, [isOpen, onClose, currentIndex, images]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div className="project-viewer-overlay" onClick={onClose}>
      <div className="project-viewer-wrapper">
        <div className="project-viewer-container" onClick={(e) => e.stopPropagation()}>
        <button className="project-viewer-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="project-viewer-header">
          <h3 className="project-viewer-title">{projectTitle}</h3>
          <div className="project-viewer-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        <div className="project-viewer-content">
          <button 
            className="project-viewer-nav project-viewer-nav-prev" 
            onClick={handlePrevious}
            aria-label="Imagen anterior"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="project-viewer-carousel">
            <div 
              className="project-viewer-slide-container"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="project-viewer-slide">
                  <img
                    src={image}
                    alt={`${projectTitle} - Imagen ${index + 1}`}
                    className="project-viewer-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <button 
            className="project-viewer-nav project-viewer-nav-next" 
            onClick={handleNext}
            aria-label="Imagen siguiente"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="project-viewer-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`project-viewer-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
