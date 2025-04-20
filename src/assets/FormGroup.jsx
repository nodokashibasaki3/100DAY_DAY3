import React from 'react';

/**
 * Form group component for consistent form layout
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Form field label
 * @param {string} [props.htmlFor] - ID of the input for label association
 * @param {React.ReactNode} props.children - Form field(s)
 * @param {string} [props.helperText] - Optional helper text
 * @param {string} [props.errorText] - Optional error message
 * @param {boolean} [props.isRequired=false] - Whether the field is required
 * @returns {React.ReactElement}
 */
const FormGroup = ({
  label,
  htmlFor,
  children,
  helperText,
  errorText,
  isRequired = false
}) => {
  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={htmlFor} 
          className="form-label"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {helperText && !errorText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      
      {errorText && (
        <p className="mt-1 text-sm text-red-600">{errorText}</p>
      )}
    </div>
  );
};

export default FormGroup;