import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import {useEffect, useState} from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {object} from "prop-types";
import PieChart from "@/components/DataPie";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface Dictionary {
    [key: string]: string;  // Key type is `string`, value type is `number`
}


export const colors: Dictionary = {
    'ERRORED': 'rgba(255, 99, 132, 1)',
    'QUEUED': 'rgba(255, 206, 86, 1)',
    'ADDED': 'rgb(68,196,255)',
    'DONE': 'rgba(75, 192, 192, 1)',
    'VIN': 'rgba(100, 100, 255, 1)',
    'Yesterday': 'rgba(100, 100, 255, 1)',
    'Today': 'rgba(75, 192, 192, 1)',
    'Tomorrow': 'rgba(255, 206, 86, 1)',
    default: 'rgba(255, 255, 255, 1)'
}

export const pieData = {
    labels: [''],
    datasets: [
        {
            label: '# of Records',
            data: [],
            borderWidth: 1,
            backgroundColor: [''],
            borderColor: [''],
        },
    ],
};

export const pieDate = {
    labels: [''],
    datasets: [
        {
            label: '# of Records',
            data: [],
            borderWidth: 1,
            backgroundColor: [''],
            borderColor: [''],
        },
    ],
};

export default function ScrapersComponent({ statuses, pieData, recordsNumber, pieDate }: any) {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>
            {domLoaded && (
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                    <PieChart
                        data={pieData}
                        title="Status"
                        subtitle={"At all: " + recordsNumber}
                    />
                    <PieChart
                        data={pieDate}
                        title="Traffic"
                        subtitle="Analysis by Dates"
                    />
                </div>
            )}
        </>
    );
}
export function generateChartData(items: Record<string, number>, colors: Dictionary) {
    const labels = Object.keys(items);
    const data = Object.values(items);
    const backgroundColor = labels.map(label => colors[label] || colors.default);
    const borderColor = backgroundColor; // В данном случае граница такая же, как фон

    return {
        labels,
        datasets: [{
            label: '# of Records',
            data,
            borderWidth: 1,
            backgroundColor,
            borderColor,
        }],
    };
}
