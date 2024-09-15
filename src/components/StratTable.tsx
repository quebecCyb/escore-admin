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


const StrategyTable = ({ data }: {data: StrategyTableProps}) => {
    console.log('clusters!!!!!')
    console.log(data)
    return (
        <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th>SWOT & CSFs</th>
                <th>Strategy</th>
                <th>Local Mission</th>
                <th>Global mission</th>
                <th>Vision</th>
            </tr>
            </thead>
            <tbody>
            {data.clusters.clusters.map((cluster: Cluster, index: number) => (
                <tr key={index}>
                    <td>
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
                    <td>
                        <strong>{cluster.name}</strong>
                        <p>{cluster.strategy}</p>
                    </td>
                    <td>
                        <p>{cluster.mission}</p>
                    </td>
                    {/* Глобальная миссия и видение выводятся один раз для каждой стратегии */}
                    {index === 0 && (
                        <>
                            <td rowSpan={data.clusters.clusters.length} style={{ verticalAlign: 'top' }}>
                                {data.clusters.mission_statement}
                            </td>
                            <td rowSpan={data.clusters.clusters.length} style={{ verticalAlign: 'top' }}>
                                {data.clusters.vision}
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