import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

/**
 * DataTable component for displaying tabular data with sorting and pagination
 * 
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column configuration objects
 * @param {Array} props.data - Array of data objects
 * @param {boolean} [props.isSortable=true] - Whether sorting is enabled
 * @param {boolean} [props.isPaginated=false] - Whether pagination is enabled
 * @param {number} [props.pageSize=10] - Number of rows per page
 * @param {boolean} [props.isSelectable=false] - Whether row selection is enabled
 * @param {Function} [props.onRowClick] - Callback when row is clicked
 * @param {string} [props.emptyMessage="No data available"] - Message shown when no data
 * @returns {React.ReactElement}
 */
const DataTable = ({
  columns = [],
  data = [],
  isSortable = true,
  isPaginated = false,
  pageSize = 10,
  isSelectable = false,
  onRowClick,
  emptyMessage = "No data available"
}) => {
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for row selection
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Handle sort request
  const handleSort = (key) => {
    if (!isSortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Sort the data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === bValue) return 0;
      
      // Handle different data types
      if (typeof aValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? result : -result;
      } else {
        const result = aValue < bValue ? -1 : 1;
        return sortConfig.direction === 'asc' ? result : -result;
      }
    });
  }, [data, sortConfig]);
  
  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!isPaginated) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, isPaginated]);
  
  // Total pages for pagination
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data, pageSize]);
  
  // Handle row selection
  const handleRowSelect = (rowId, isChecked) => {
    if (isChecked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    }
  };
  
  // Handle "select all" checkbox
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allRowIds = paginatedData.map(row => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };
  
  // Check if all rows are selected
  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every(row => selectedRows.includes(row.id));
  
  return (
    <div className="overflow-hidden">
      {/* Table */}
      <table className="data-table">
        <thead className="table-header">
          <tr>
            {/* Selection checkbox column */}
            {isSelectable && (
              <th className="px-4 py-3 w-10">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
            )}
            
            {/* Column headers */}
            {columns.map((column) => (
              <th 
                key={column.key} 
                className={`table-header-cell ${isSortable && column.sortable !== false ? 'cursor-pointer' : ''}`}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  
                  {/* Sort indicators */}
                  {isSortable && column.sortable !== false && sortConfig.key === column.key && (
                    <span>
                      {sortConfig.direction === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="table-body">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex} 
                className={`table-row ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {/* Selection checkbox */}
                {isSelectable && (
                  <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => handleRowSelect(row.id, e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                )}
                
                {/* Data cells */}
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={isSelectable ? columns.length + 1 : columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Pagination */}
      {isPaginated && totalPages > 1 && (
        <div className="py-3 px-6 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn btn-secondary btn-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-secondary btn-sm"
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, data.length)}
                </span>{' '}
                of <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Previous page */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronUp className="h-5 w-5 rotate-90" />
                </button>
                
                {/* Page numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`
                        relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${isCurrentPage
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }
                      `}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                {/* Next page */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;