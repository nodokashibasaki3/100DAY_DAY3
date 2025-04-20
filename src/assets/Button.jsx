import React from 'react';

/**
 * Button component with variants
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button style variant
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {boolean} [props.isFullWidth=false] - Whether button should take full width
 * @param {React.ReactNode} [props.leftIcon] - Optional icon to show before text
 * @param {React.ReactNode} [props.rightIcon] - Optional icon to show after text
 * @param {boolean} [props.isDisabled=false] - Whether button is disabled
 * @param {boolean} [props.isLoading=false] - Whether button is in loading state
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.type='button'] - Button type attribute
 * @returns {React.ReactElement}
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  leftIcon,
  rightIcon,
  isDisabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'btn inline-flex items-center justify-center font-medium';
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    link: 'bg-transparent text-indigo-600 hover:underline shadow-none'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'btn-sm text-xs',
    md: 'text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  // Width class
  const widthClass = isFullWidth ? 'w-full' : '';
  
  // Disabled and loading states
  const stateClasses = isDisabled || isLoading
    ? 'opacity-50 cursor-not-allowed'
    : '';
  
  const className = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${widthClass}
    ${stateClasses}
  `.trim();
  
  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;