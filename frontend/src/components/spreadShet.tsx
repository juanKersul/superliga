import React, { useState, useEffect } from 'react';
import Table from './Table';

interface TableData {
  title: string;
  data: Record<string, any>[];
}

interface SpreadsheetProps {
  tables: { [key: string]: TableData };
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ tables }) => {
  const tableNamesWithData = Object.keys(tables).filter(tableName => tables[tableName].data.length > 0);
  const [selectedTable, setSelectedTable] = useState<string>(tableNamesWithData[0] || '');

  useEffect(() => {
    if (!tableNamesWithData.includes(selectedTable)) {
      setSelectedTable(tableNamesWithData[0] || '');
    }
  }, [tables, selectedTable, tableNamesWithData]);

  const shouldShowButtons = tableNamesWithData.length > 0;
  const currentTableData = tables[selectedTable];

  return (
    <div className="mx-auto p-4">
      {shouldShowButtons ? (
        <div className="mb-4 flex space-x-2">
          {tableNamesWithData.map((tableName) => (
            <button
              key={tableName}
              className={`px-4 py-2 rounded flex-1 ${selectedTable === tableName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setSelectedTable(tableName)}
            >
              {tables[tableName].title}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No tables with data available</p>
      )}
      {selectedTable && currentTableData && (
        <Table title={currentTableData.title} data={currentTableData.data} />
      )}
    </div>
  );
};

export default Spreadsheet;


