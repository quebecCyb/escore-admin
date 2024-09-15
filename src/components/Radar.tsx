// components/RadarChart.js
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

const parseChartData = (chartData: Record<string, any>) => {
    const labels = Object.keys(chartData);
    const data = Object.values(chartData).map(value => parseInt(value, 10));

    return {
        labels,
        datasets: [
            {
                label: 'Company Performance', // or any other label you find suitable
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
};


ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ chartData }: {chartData: Record<string, any>}) => {
    const data = parseChartData(chartData);

    const options = {
        scales: {
            r: {
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
