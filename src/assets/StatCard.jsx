import React from 'react';

/**
 * Statistical card component for dashboard displays
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main statistical value to display
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} [props.trend] - Optional trend indicator (up/down/neutral)
 * @param {string} [props.trendValue] - Optional trend value (e.g., "+12%")
 * @param {string} [props.footer] - Optional footer text
 * @returns {React.ReactElement}
 */
const StatCard = ({ title, value, icon, trend, trendValue, footer }) => {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className={`stat-value ${getTrendColor(trend)}`}>{value}</p>
          {trendValue && (
            <div className={`text-sm ${getTrendTextColor(trend)}`}>
              {trendValue}
            </div>
          )}
        </div>
        <div>
          {icon}
        </div>
      </div>
      {footer && <p className="text-gray-500 text-sm mt-2">{footer}</p>}
    </div>
  );
};

/**
 * Helper function to get color class based on trend
 */
const getTrendColor = (trend) => {
  if (!trend) return 'text-indigo-600';
  
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    default:
      return 'text-indigo-600';
  }
};

/**
 * Helper function to get text color class based on trend
 */
const getTrendTextColor = (trend) => {
  if (!trend) return 'text-gray-500';
  
  switch (trend) {
    case 'up':
      return 'text-green-500';
    case 'down':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default StatCard;