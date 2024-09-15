import React from 'react';

interface SWOTItem {
    content: string;
}

interface SWOTTableProps {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
}

const SWOTTable: React.FC<SWOTTableProps> = ({ strengths, weaknesses, opportunities, threats }) => {
    return (
        <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th>Strengths</th>
                <th>Weaknesses</th>
                <th>Opportunities</th>
                <th>Threats</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <ul>
                        {strengths.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <ul>
                        {weaknesses.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <ul>
                        {opportunities.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <ul>
                        {threats.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default SWOTTable;
