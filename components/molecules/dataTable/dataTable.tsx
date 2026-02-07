import React from "react";

interface DataTableProps<T> {
  columns: Array<{
    header: string;
    render: (item: T) => React.ReactNode;
  }>;
  data: T[];
}

const DataTable = <T extends { id: number | string }>({
  columns,
  data,
}: DataTableProps<T>) => {
  return (
    <div className="text-xs border border-gray-200 rounded-lg overflow-hidden">
      {/* Encabezado */}
      <div
        className="grid tracking-wider p-2 bg-gray-200 font-semibold text-gray-700"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col, index) => (
          <span key={index}>{col.header}</span>
        ))}
      </div>

      {/* Filas */}
      {data.map((item, rowIndex) => (
        <div
          key={`${item.id}-${rowIndex}`}
          className="grid items-center p-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col">
              {col.render(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataTable;
