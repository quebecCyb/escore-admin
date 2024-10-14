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

interface PerspectiveKPITableProps {
    clusters: Cluster[];
}

const perspectivesOrder = ['Financial', 'Customer', 'Steering', 'Delivery'];

const PerspectiveKPITable: React.FC<PerspectiveKPITableProps> = ({ clusters }) => {
    // Собираем все KPI в один массив
    const kpiItems = clusters.flatMap((cluster) =>
        cluster.swot.map((swotItem) => ({
            perspective: swotItem.kpi.perspective,
            kpi: swotItem.kpi,
        }))
    );

    // Группируем KPI по перспективам
    const groupedKPIItems = perspectivesOrder.map(perspective => ({
        perspective,
        kpis: kpiItems
            .filter(item => item.perspective === perspective)
            .map(item => item.kpi.name)
    }));

    return (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', border: '1px solid white' }}>
            <thead>
            <tr style={{borderBottom: '1px solid white'}}>
                <th style={{border: '1px solid white'}}>Perspective</th>
                <th style={{border: '1px solid white'}}>KPI Names</th>
            </tr>
            </thead>
            <tbody>
            {groupedKPIItems.map((item, index) => (
                <tr key={index} style={{borderBottom: '1px solid white'}}>
                    <td style={{border: '1px solid white', padding: '8px'}}>
                        {item.perspective}
                    </td>
                    <td style={{border: '1px solid white', padding: '8px'}}>
                        {item.kpis.join(', ')}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PerspectiveKPITable;
