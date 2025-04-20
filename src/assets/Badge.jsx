import React from 'react';

/**
 * Badge component for displaying status, tags, etc.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Text to display in badge
 * @param {string} props.variant - Visual variant (success, warning, danger, info, default)
 * @param {boolean} [props.rounded=true] - Whether badge should have fully rounded corners
 * @returns {React.ReactElement}
 */
const Badge = ({ text, variant, rounded = true }) => {
  const baseClasses = `inline-flex items-center px-2 py-1 text-xs font-semibold ${rounded ? 'rounded-full' : 'rounded'}`;
  
  const variantClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    default: 'bg-gray-100 text-gray-800'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;
  
  return (
    <span className={classes}>
      {text}
    </span>
  );
};

export default Badge;