/**
 * Format a date string
 * 
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const defaultOptions = {
      weekday: undefined,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    
    return dateObj.toLocaleDateString('en-US', defaultOptions);
  };
  
  /**
   * Format time string
   * 
   * @param {string} timeString - Time string in 24-hour format (HH:MM)
   * @param {boolean} use12Hour - Whether to convert to 12-hour format
   * @returns {string} Formatted time string
   */
  export const formatTime = (timeString, use12Hour = true) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (use12Hour) {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  /**
   * Format a number with commas as thousands separators
   * 
   * @param {number} num - Number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted number
   */
  export const formatNumber = (num, decimals = 0) => {
    if (num === undefined || num === null) return '';
    
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  /**
   * Check if two time slots overlap
   * 
   * @param {Object} slot1 - First time slot
   * @param {string} slot1.startTime - Start time in 24-hour format (HH:MM)
   * @param {string} slot1.endTime - End time in 24-hour format (HH:MM)
   * @param {Object} slot2 - Second time slot
   * @param {string} slot2.startTime - Start time in 24-hour format (HH:MM)
   * @param {string} slot2.endTime - End time in 24-hour format (HH:MM)
   * @returns {boolean} Whether the slots overlap
   */
  export const doTimeSlotsOverlap = (slot1, slot2) => {
    // Convert time strings to minutes since midnight for easier comparison
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const slot1Start = timeToMinutes(slot1.startTime);
    const slot1End = timeToMinutes(slot1.endTime);
    const slot2Start = timeToMinutes(slot2.startTime);
    const slot2End = timeToMinutes(slot2.endTime);
    
    // Check for overlap
    return Math.max(slot1Start, slot2Start) < Math.min(slot1End, slot2End);
  };
  
  /**
   * Find compatible time slots between two availability arrays
   * 
   * @param {Array} availability1 - First array of availability objects
   * @param {Array} availability2 - Second array of availability objects
   * @returns {Array} Array of compatible time slots
   */
  export const findCompatibleTimeSlots = (availability1, availability2) => {
    const compatibleSlots = [];
    
    availability1.forEach(slot1 => {
      availability2.forEach(slot2 => {
        if (slot1.day === slot2.day) {
          // Check if there's an overlap
          const timeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
          };
          
          const slot1Start = timeToMinutes(slot1.startTime);
          const slot1End = timeToMinutes(slot1.endTime);
          const slot2Start = timeToMinutes(slot2.startTime);
          const slot2End = timeToMinutes(slot2.endTime);
          
          // If there's an overlap, find the overlapping time range
          if (Math.max(slot1Start, slot2Start) < Math.min(slot1End, slot2End)) {
            const overlapStart = Math.max(slot1Start, slot2Start);
            const overlapEnd = Math.min(slot1End, slot2End);
            
            // Convert minutes back to time strings
            const minutesToTime = (minutes) => {
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
            };
            
            compatibleSlots.push({
              day: slot1.day,
              startTime: minutesToTime(overlapStart),
              endTime: minutesToTime(overlapEnd)
            });
          }
        }
      });
    });
    
    return compatibleSlots;
  };
  
  /**
   * Generate an array of time options for select inputs
   * 
   * @param {number} startHour - Starting hour (0-23)
   * @param {number} endHour - Ending hour (0-23)
   * @param {number} interval - Interval in minutes (e.g., 15, 30)
   * @returns {Array} Array of time option objects
   */
  export const generateTimeOptions = (startHour = 8, endHour = 20, interval = 30) => {
    const options = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        if (hour === endHour && minute > 0) break;
        
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTime(timeValue, true);
        
        options.push({
          value: timeValue,
          label: displayTime
        });
      }
    }
    
    return options;
  };
  
  /**
   * Get day name from date
   * 
   * @param {Date|string} date - Date object or date string
   * @returns {string} Day name (Monday, Tuesday, etc.)
   */
  export const getDayName = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  };
  
  /**
   * Truncate text with ellipsis if it exceeds the specified length
   * 
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };