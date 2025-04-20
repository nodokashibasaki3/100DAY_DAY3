import React, { forwardRef } from 'react';

/**
 * Reusable Input component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.id] - Input id attribute
 * @param {string} [props.name] - Input name attribute
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {boolean} [props.isDisabled=false] - Whether input is disabled
 * @param {boolean} [props.isReadOnly=false] - Whether input is read-only
 * @param {boolean} [props.isInvalid=false] - Whether input has validation error
 * @param {React.ReactNode} [props.leftAddon] - Content to display before input
 * @param {React.ReactNode} [props.rightAddon] - Content to display after input
 * @returns {React.ReactElement}
 */
const Input = forwardRef(({
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  leftAddon,
  rightAddon,
  ...rest
}, ref) => {
  // Base classes for different states
  const baseClasses = 'form-input';
  const invalidClasses = isInvalid ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : '';
  const disabledClasses = isDisabled ? 'bg-gray-100 cursor-not-allowed' : '';
  
  // Adjust padding when addons are present
  const inputClasses = `
    ${baseClasses}
    ${invalidClasses}
    ${disabledClasses}
    ${leftAddon ? 'rounded-l-none' : ''}
    ${rightAddon ? 'rounded-r-none' : ''}
  `.trim();
  
  // If we have addons, we need a wrapper
  if (leftAddon || rightAddon) {
    return (
      <div className="flex rounded-md shadow-sm">
        {leftAddon && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {leftAddon}
          </span>
        )}
        
        <input
          type={type}
          id={id}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          ref={ref}
          {...rest}
        />
        
        {rightAddon && (
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {rightAddon}
          </span>
        )}
      </div>
    );
  }
  
  // Simple input without addons
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={inputClasses}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      readOnly={isReadOnly}
      ref={ref}
      {...rest}
    />
  );
});

// Display name for dev tools
Input.displayName = 'Input';

export default Input;