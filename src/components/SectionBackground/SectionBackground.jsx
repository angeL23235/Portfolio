import { useEffect, useRef, useState } from 'react';
import './SectionBackground.css';

const SectionBackground = ({ sections = [], onBackgroundChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const sectionsElements = sections
      .map(section => {
        const sectionId = typeof section === 'object' ? section.id : section;
        return {
          id: sectionId,
          element: document.getElementById(sectionId),
          image: typeof section === 'object' ? section.image : null
        };
      })
      .filter(item => item.element !== null);
    
    if (sectionsElements.length === 0) return;

    const uniqueBackgrounds = [];
    const backgroundMap = new Map();
    
    sectionsElements.forEach((item, index) => {
      const imageKey = item.image;
      if (!backgroundMap.has(imageKey)) {
        backgroundMap.set(imageKey, uniqueBackgrounds.length);
        uniqueBackgrounds.push({
          image: imageKey,
          sections: []
        });
      }
      uniqueBackgrounds[backgroundMap.get(imageKey)].sections.push(index);
    });

    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      let mostVisibleIndex = 0;
      let maxVisibility = 0;

      sectionsElements.forEach((item, index) => {
        const rect = item.element.getBoundingClientRect();
        
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        const visibility = visibleHeight / Math.min(rect.height, viewportHeight);
        
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
        const centerScore = 1 / (1 + distanceFromCenter / viewportHeight);
        
        const score = visibility * 0.7 + centerScore * 0.3;
        
        if (score > maxVisibility && rect.bottom > 0 && rect.top < viewportHeight) {
          maxVisibility = score;
          mostVisibleIndex = index;
        }
      });

      const visibleSectionImage = sectionsElements[mostVisibleIndex].image;
      const backgroundIndex = backgroundMap.get(visibleSectionImage);

      setActiveIndex(prevIndex => {
        if (prevIndex !== backgroundIndex) {
          if (onBackgroundChange) {
            onBackgroundChange(backgroundIndex);
          }
          return backgroundIndex;
        }
        return prevIndex;
      });
    };

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sections]);

  const uniqueBackgrounds = [];
  const seenImages = new Set();
  
  sections.forEach((section) => {
    const imageUrl = typeof section === 'object' ? section.image : null;
    if (imageUrl && !seenImages.has(imageUrl)) {
      seenImages.add(imageUrl);
      uniqueBackgrounds.push(imageUrl);
    }
  });

  return (
    <div className="section-backgrounds">
      {uniqueBackgrounds.map((imageUrl, index) => {
        const isBackground1 = index === 0;
        return (
          <div
            key={index}
            className={`section-background ${index === activeIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: isBackground1 ? 'center 30%' : 'center center'
            }}
          />
        );
      })}
    </div>
  );
};

export default SectionBackground;
