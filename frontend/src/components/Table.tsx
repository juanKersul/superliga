import React from 'react';

interface TableProps {
  title: string;
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ title, data }) => {
  if (data.length === 0) {
    return <p className="text-gray-400 text-center">No data available</p>;
  }

  const keys = Object.keys(data[0]);

  return (
    <div className="max-w-full max-h-96 overflow-auto borde rounded-lg shadow">
      <h2 className="text-xl bg-blue-500 text-white font-bold text-center p-2">{title}</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                {keys.map((key) => (
                  <td
                    key={key}
                    className="px-4 py-2 text-sm text-gray-600"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

