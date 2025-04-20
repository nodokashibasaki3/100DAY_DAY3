import React from 'react';

/**
 * Card component for containing content
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {React.ReactNode} [props.header] - Optional card header content
 * @param {React.ReactNode} [props.footer] - Optional card footer content
 * @param {boolean} [props.isHoverable=false] - Whether card has hover effect
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const Card = ({
  children,
  header,
  footer,
  isHoverable = false,
  className = '',
}) => {
  const cardClasses = `card ${isHoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''} ${className}`.trim();
  
  return (
    <div className={cardClasses}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * Card.Header component for standard card header layout
 */
Card.Header = ({ children, title, action }) => {
  return (
    <div className="flex justify-between items-center">
      {title ? (
        <h3 className="text-lg font-semibold">{title}</h3>
      ) : (
        <div>{children}</div>
      )}
      
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};

/**
 * Card.Footer component for standard card footer layout
 */
Card.Footer = ({ children, align = 'right' }) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };
  
  return (
    <div className={`flex ${alignmentClasses[align] || alignmentClasses.right}`}>
      {children}
    </div>
  );
};

export default Card;