import React from 'react';

interface ListProps {
    rows: any[]
}

const Table: React.FC<ListProps> = ({ rows }) => {
    // Generate table headers from the first row keys
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        {headers.map(header => (
                            <th key={header} className="px-4 py-3">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {rows.map((row, index) => (
                        <tr key={index} className="text-gray-700 dark:text-gray-400">
                            {headers.map(header => (
                                <td key={`${header}-${index}`} className="px-4 py-3 text-sm" dangerouslySetInnerHTML={{__html: row[header]}}>

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
