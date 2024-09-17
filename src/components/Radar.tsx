import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend, FontSpec,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


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


const parseChartData = (props: CSFKPITableProps) => {
    const labels: string[] = [];
    const data: number[] = [];


    props.clusters.forEach((cluster) => {
        cluster.swot.forEach((swotItem) => {
            const kpi = swotItem.kpi;
            const actuals = parseFloat(kpi.actuals);
            const targets = parseFloat(kpi.targets);
            const rating = Math.min(Math.max((actuals / targets) * 5, 0), 5); // Scale rating between 0 and 5

            labels.push(kpi.name);
            data.push(rating);
        });
    });

    return {
        labels,
        datasets: [
            {
                label: 'KPI Ratings',
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
};



ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ clusters }: CSFKPITableProps) => {
    const data = parseChartData({ clusters });

    const options = {
        scales: {
            r: {
                min: 0, // Minimum value set to 0
                max: 5, // Maximum value set to 5
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.3)', // Change the color of the angle lines
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Change the color of the grid lines
                },
                pointLabels: {
                    font: {
                        size: 16, // Font size for the labels around the radar chart
                        family: 'Arial', // Font family
                        style: 'italic', // Font style
                        weight: 'bold', // Font weight
                    } as Partial<FontSpec>,
                    color: '#fff', // Font color for the labels
                },
                ticks: {
                    backdropColor: 'rgba(0, 0, 0, 0)', // No backdrop for the ticks
                    color: '#fff', // Color of the ticks
                    stepSize: 1, // Steps of 1 between ticks
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial',
                        style: 'italic',
                        weight: 'bold',
                    } as Partial<FontSpec>,
                    color: '#fff', // Color of the legend labels
                },
            },
        },
    };

    return <Radar data={data} options={options} />;
};

export default RadarChart;
