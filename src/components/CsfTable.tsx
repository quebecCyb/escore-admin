import React from 'react';

interface SWOTItem {
    content: string;
    critical_success_factor: string;
}

interface Cluster {
    strategy: string;
    name: string;
    swot: SWOTItem[];
}

interface ClusterTableProps {
    clusters: Cluster[];
}

const ClusterTable: React.FC<ClusterTableProps> = ({ clusters }) => {
    return (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', border: '1px solid white' }}>
            <thead>
            <tr style={{borderBottom: '1px solid white'}}>
                <th style={{border: '1px solid white'}}>Strategy Obj</th>
                <th style={{border: '1px solid white'}}>SWOT Analysis</th>
                <th style={{border: '1px solid white'}}>CSFs</th>
            </tr>
            </thead>
            <tbody>
            {clusters.map((cluster, index) => (
                <tr key={index} style={{borderBottom: '1px solid white'}}>
                    <td style={{border: '1px solid white', padding: '8px'}}>
                        <strong>{cluster.strategy}</strong>
                    </td>
                    <td style={{border: '1px solid white', padding: '8px'}}>
                        <ul>
                            {cluster.swot.map((swotItem, swotIndex) => (
                                <li key={swotIndex}>
                                    <strong>{swotItem.content}</strong>
                                </li>
                            ))}
                        </ul>
                    </td>

                    <td style={{border: '1px solid white', padding: '8px'}}>
                        <ul>
                            {cluster.swot.map((swotItem, swotIndex) => (
                                <li key={swotIndex}>
                                    <strong>{swotItem.critical_success_factor}</strong>
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ClusterTable;
