import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function CompanyLogo({ logoSrc, altText, width, height, className }) {
  return (
    <img
      src={"../../public/assets/sankalp_vidya_logo.png"}
      alt={altText}
    //   width={width}
    //   height={height}
      className={className}
    />
  );
}

// Add PropTypes for type checking and documentation
CompanyLogo.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

// Add default props for width and height
CompanyLogo.defaultProps = {
  width: '100px', // Default width
  height: 'auto', // Default height
};

export default CompanyLogo;