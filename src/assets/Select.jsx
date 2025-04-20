import React, { forwardRef } from 'react';

/**
 * Reusable Select component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.id] - Select id attribute
 * @param {string} [props.name] - Select name attribute
 * @param {string} [props.value] - Select value
 * @param {Function} [props.onChange] - Change handler
 * @param {boolean} [props.isDisabled=false] - Whether select is disabled
 * @param {boolean} [props.isInvalid=false] - Whether select has validation error
 * @param {Object[]} props.options - Array of option objects
 * @param {string} props.options[].value - Option value
 * @param {string} props.options[].label - Option label
 * @param {boolean} [props.options[].disabled] - Whether option is disabled
 * @param {string} [props.placeholder] - Placeholder text for first empty option
 * @param {boolean} [props.multiple=false] - Whether multiple selection is allowed
 * @returns {React.ReactElement}
 */
const Select = forwardRef(({
  id,
  name,
  value,
  onChange,
  isDisabled = false,
  isInvalid = false,
  options = [],
  placeholder,
  multiple = false,
  ...rest
}, ref) => {
  // Base classes for different states
  const baseClasses = 'form-select';
  const invalidClasses = isInvalid ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : '';
  const disabledClasses = isDisabled ? 'bg-gray-100 cursor-not-allowed' : '';
  
  // Multiple select needs different height
  const multipleClasses = multiple ? 'h-auto min-h-[80px]' : '';
  
  const selectClasses = `
    ${baseClasses}
    ${invalidClasses}
    ${disabledClasses}
    ${multipleClasses}
  `.trim();
  
  return (
    <select
      id={id}
      name={name}
      className={selectClasses}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      multiple={multiple}
      ref={ref}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
});

// Display name for dev tools
Select.displayName = 'Select';

export default Select;