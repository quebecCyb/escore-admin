import React from 'react';

interface KPI {
    name: string;
    formula: string;
    description: string;
    perspective: string;
    actuals: string;
    targets: string;
}

interface SWOTItem {
    content: string;
    type: number;
    critical_success_factor: string;
    kpi: KPI;
}

interface Cluster {
    name: string;
    strategy: string;
    mission: string;
    swot: SWOTItem[];
}

interface CSFKPITableProps {
    clusters: Cluster[];
}

const CSFKPITable: React.FC<CSFKPITableProps> = ({ clusters }) => {
    return (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', border: '1px solid white' }}>
            <thead>
            <tr style={{borderBottom: '1px solid white'}}>
                <th style={{border: '1px solid white'}}>Cluster Name</th>
                <th style={{border: '1px solid white'}}>Critical Success Factor (CSF)</th>
                <th style={{border: '1px solid white'}}>KPI</th>
                <th style={{border: '1px solid white'}}>KPI Description</th>
                <th style={{border: '1px solid white'}}>KPI Actuals/Targets</th>
            </tr>
            </thead>
            <tbody>
            {clusters.map((cluster, clusterIndex) => (
                    cluster.swot.map((swotItem, swotIndex) => (
                        <tr key={`${clusterIndex}-${swotIndex}`} style={{borderBottom: '1px solid white'}}>
                            <td style={{border: '1px solid white', padding: '8px'}}>
                                {swotIndex === 0 && <strong>{cluster.name}</strong>}
                            </td>
                            <td style={{border: '1px solid white', padding: '8px'}}>
                                {swotItem.critical_success_factor}
                            </td>
                            <td style={{border: '1px solid white', padding: '8px'}}>
                                <strong>{swotItem.kpi.name} ({swotItem.kpi.perspective})</strong>
                                <br/>
                                <em>{swotItem.kpi.formula}</em>
                            </td>
                            <td style={{border: '1px solid white', padding: '8px'}}>
                                {swotItem.kpi.description}
                            </td>
                            <td style={{border: '1px solid white', padding: '8px'}}>
                                {swotItem.kpi.actuals}/{swotItem.kpi.targets}
                            </td>
                        </tr>
                    ))
            ))}
            </tbody>
        </table>
    );
};

export default CSFKPITable;
