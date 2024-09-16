import React from 'react';
import exp from "node:constants";

interface SWOTItem {
    content: string;
    critical_success_factor: string;
}

interface Cluster {
    name: string;
    strategy: string;
    mission: string;
    swot: SWOTItem[];
}

interface ClustersData {
    clusters: Cluster[];
    mission_statement: string;
    vision: string;
}

interface StrategyTableProps {
    clusters: ClustersData;
}


const StrategyTable: React.FC<StrategyTableProps> = ({ clusters }) => {
    console.log('clusters!!!!!')
    console.log(clusters)
    return (
        <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
            <tr style={{ border: '1px solid white', padding: '8px' }}>
                <th style={{ border: '1px solid white', padding: '8px' }}>SWOT & CSFs</th>
                <th style={{ border: '1px solid white', padding: '8px' }}>Strategy</th>
                <th style={{ border: '1px solid white', padding: '8px' }}>Local Mission</th>
                <th style={{ border: '1px solid white', padding: '8px' }}>Global mission</th>
                <th style={{ border: '1px solid white', padding: '8px' }}>Vision</th>
            </tr>
            </thead>
            <tbody>
            {clusters.clusters.map((cluster: Cluster, index: number) => (
                <tr key={index} style={{ border: '1px solid white', padding: '8px' }}>
                    <td style={{ border: '1px solid white', padding: '8px' }}>
                        <ul>
                            {cluster.swot.map((swotItem, swotIndex: number) => (
                                <li key={swotIndex}>
                                    <strong>{swotItem.content}</strong>
                                    <br />
                                    <em>CSF:</em> {swotItem.critical_success_factor}
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td style={{ border: '1px solid white', padding: '8px' }}>
                        <strong>{cluster.name}</strong>
                        <p>{cluster.strategy}</p>
                    </td>
                    <td style={{ border: '1px solid white', padding: '8px' }}>
                        <p>{cluster.mission}</p>
                    </td>
                    {/* Глобальная миссия и видение выводятся один раз для каждой стратегии */}
                    {index === 0 && (
                        <>
                            <td style={{ border: '1px solid white', padding: '8px', verticalAlign: 'top' }} rowSpan={clusters.clusters.length}>
                                {clusters.mission_statement}
                            </td>
                            <td style={{ border: '1px solid white', padding: '8px', verticalAlign: 'top' }} rowSpan={clusters.clusters.length}>
                                {clusters.vision}
                            </td>
                        </>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default StrategyTable;
