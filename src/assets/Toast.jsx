import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * Toast notification component
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Toast type (success, error, warning, info)
 * @param {string} props.message - Toast message
 * @param {string} [props.title] - Optional toast title
 * @param {number} [props.duration=3000] - How long the toast displays (ms)
 * @param {Function} props.onClose - Function to call when toast closes
 * @param {boolean} [props.isVisible=true] - Whether toast is visible
 * @returns {React.ReactElement|null}
 */
const Toast = ({
  type = 'info',
  message,
  title,
  duration = 3000,
  onClose,
  isVisible = true
}) => {
  const [isClosing, setIsClosing] = useState(false);
  
  // Auto-close timer
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [isVisible, duration]);
  
  // Animation end handler
  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };
  
  if (!isVisible) return null;
  
  // Icon by type
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />
  };
  
  // Background by type
  const bgColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50'
  };
  
  // Border color by type
  const borderColors = {
    success: 'border-green-400',
    error: 'border-red-400',
    warning: 'border-yellow-400',
    info: 'border-blue-400'
  };
  
  // Title color by type
  const titleColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  };
  
  // Message color by type
  const messageColors = {
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-yellow-700',
    info: 'text-blue-700'
  };
  
  return (
    <div
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border ${borderColors[type]} shadow-lg
        ${bgColors[type]}
        ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            {title && (
              <p className={`text-sm font-medium ${titleColors[type]}`}>{title}</p>
            )}
            <p className={`mt-1 text-sm ${messageColors[type]}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`inline-flex rounded-md ${messageColors[type]} hover:text-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              onClick={() => setIsClosing(true)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;