import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
    data: {
        labels: string[];
        datasets: Array<{
            data: number[];
            borderWidth: number;
            backgroundColor: string[];
            borderColor: string[];
        }>;
    };
    title: string;
    subtitle: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, subtitle }) => {
    return (
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                {title}
            </h4>
            <Pie data={data} />
            <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                    <span>{subtitle}</span>
                </div>
            </div>
        </div>
    );
};

export default PieChart;
