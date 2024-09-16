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
        <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', border: '1px solid white' }}>
            <thead>
            <tr style={{ border: '1px solid white' }}>
                <th style={{ border: '1px solid white' }}>Strengths</th>
                <th style={{ border: '1px solid white' }}>Weaknesses</th>
                <th style={{ border: '1px solid white' }}>Opportunities</th>
                <th style={{ border: '1px solid white' }}>Threats</th>
            </tr>
            </thead>
            <tbody>
            <tr   style={{ border: '1px solid white', padding: '8px' }}>
                <td style={{ border: '1px solid white', padding: '8px' }}>
                    <ul>
                        {strengths.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
                <td style={{ border: '1px solid white' }}>
                    <ul>
                        {weaknesses.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
                <td style={{ border: '1px solid white' }}>
                    <ul>
                        {opportunities.split(';').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </td>
                <td style={{ border: '1px solid white' }}>
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
