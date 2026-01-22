import React from 'react';
import './SocialButton.css';

const SocialButton = ({ href, icon, text, bgColor, ariaLabel }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-button-wrapper"
      aria-label={ariaLabel}
    >
      <button className="social-button" style={{ '--bg-color': bgColor }}>
        <div className="social-button-sign">
          {icon}
        </div>
        <div className="social-button-text">{text}</div>
      </button>
    </a>
  );
};

export default SocialButton;

