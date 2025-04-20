import React from 'react';

/**
 * Navigation item component used in the sidebar
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.title - Text label for the navigation item
 * @param {boolean} props.active - Whether this item is currently active
 * @param {Function} props.onClick - Click handler function
 * @returns {React.ReactElement}
 */
const NavItem = ({ icon, title, active, onClick }) => {
  return (
    <li 
      className={`nav-item ${active ? 'nav-item-active' : 'nav-item-inactive'}`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{title}</span>
    </li>
  );
};

export default NavItem;