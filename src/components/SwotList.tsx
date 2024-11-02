import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/styles/SwotList.module.css';
import {json} from "node:stream/consumers";
import RadarChart from "@/components/Radar";
import StrategyTable from "@/components/StratTable";
import SwotTable from "@/components/SwotTable";
import ClusterTable from "@/components/ClusterTable";
import CsfTable from "@/components/CsfTable";
import CSFKPITable from "@/components/kpiTable";
import PerspectiveKPITable from "@/components/kpiconnections";
import ReportImport from "@/components/ReportImport";
import {useRequiredReport} from "@/contexts/ReportContext";
import KpiActualTargets from "@/components/KpiActualTargets";

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

interface Clusters {
    vision: string;
    mission_statement: string;
    clusters: Cluster[];
}

interface TableData {
    clusters: Clusters
    required_kpi: any
}

const SwotList = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Adjusted state type for NodeJS.Timeout

    // Initialize state for each input field
    const [strength, setStrength] = useState('Strong Brand Reputation');
    const [weaknesses, setWeaknesses] = useState('High Operating Costs');
    const [opportunities, setOpportunities] = useState('Strategic Partnerships');
    const [threats, setThreats] = useState('Intense Competition ');

    const { requiredReport, extractedReport, setRequiredReport, setExtractedReport } = useRequiredReport();


    const [chartData, setChartData] = useState(null);
    const [businessDescription, setBusinessDescription] = useState('Basic Description');
    const [tableData, setTableData] = useState<TableData | null>(null);

    // Handle input change events
    const handleStrengthChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStrength(e.target.value);
    };

    const handleWeaknessesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWeaknesses(e.target.value);
    };
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessDescription(e.target.value);
    };

    const handleOpportunitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOpportunities(e.target.value);
    };

    const handleThreatsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setThreats(e.target.value);
    };

    const save = useCallback(async () => {
        setIsSaving(true);

        // Simulate save operation
        console.log('Saving report...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        console.log('Report saved successfully!');

        setIsSaving(false);
    }, []);

    // Handle content change
    const handleChange = () => {
        // Reset the timer if there's a new change
        if (timer) clearTimeout(timer);

        // Set a new timer to save after 10 seconds if no further changes
        setTimer(
            setTimeout(() => {
                save();
            }, 10000)
        );
    };

    // Clear the timer on component unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timer]);


    // Handle form submission
    const analyze = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("Form submitted!"); // Log the submission to the console


        try {
            // Make a POST request to the server
            const response = await fetch('/api/swot/csf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    swot: `Strength: ${strength}; Weaknesses: ${weaknesses}; opportunities: ${opportunities}; threats: ${threats}`
                })
            });

            if (response.ok) {
                // Handle success
                const data = await response.json();
                console.log("Success Of Chart:", data.data.clusters.required_kpi);

                setChartData(data.data.chart);
                setTableData(data.data);

                setRequiredReport(data.data.clusters.required_kpi)

            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        await save();
    };

    const generateSwot = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            // Make a POST request to the server
            const response = await fetch('/api/swot/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    swot: businessDescription
                })
            });

            if (response.ok) {
                // Handle success

                const data = await response.json();


                setStrength(data.data.strength.join(';\n'));
                setWeaknesses(data.data.weaknesses.join(';\n'));
                setOpportunities(data.data.opportunities.join(';\n'));
                setThreats(data.data.threats.join(';\n'));

            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const getChart = async () => {
        try {
            // Make a POST request to the server
            console.log('Getting chart!')
            const response = await fetch('/api/swot/csf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    swot: `Strength: ${strength}; Weaknesses: ${weaknesses}; opportunities: ${opportunities}; threats: ${threats}`
                })
            });

            if (response.ok) {
                // Handle success
                const data = await response.text();
                console.log("Success Of Chart:", data);
            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <form onSubmit={generateSwot}>
                <label>Business Description</label>

                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <input
                        className={styles.input}
                        type="text"
                        name="bidesc"
                        placeholder="business description"
                        value={businessDescription}
                        onChange={handleDescChange}
                    />

                    <button type="submit"
                            className="px-4 py-2 font-medium text-white bg-purple-600 rounded-lg focus:outline-none focus:shadow-outline-purple">
                        Submit
                    </button>

                </div>
            </form>

            <form onSubmit={analyze} className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <label>Strengths</label>
                <label>Weaknesses</label>
                <label>Opportunities</label>
                <label>Threats</label>

                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <textarea
                        className={styles.input}
                        name="strength"
                        placeholder="Strength"
                        value={strength}
                        onChange={handleStrengthChange}
                    />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <textarea
                        className={styles.input}
                        name="weaknesses"
                        placeholder="Weaknesses"
                        value={weaknesses}
                        onChange={handleWeaknessesChange}
                    />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <textarea
                        className={styles.input}
                        name="opportunities"
                        placeholder="Opportunities"
                        value={opportunities}
                        onChange={handleOpportunitiesChange}
                    />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <textarea
                        className={styles.input}
                        name="threats"
                        placeholder="Threats"
                        value={threats}
                        onChange={handleThreatsChange}
                    />
                </div>
                <button type="submit"
                        className="px-4 py-2 font-medium text-white bg-purple-600 rounded-lg focus:outline-none focus:shadow-outline-purple">
                    Submit
                </button>
            </form>
            <h2>SWOT</h2>
            {(strength || weaknesses || opportunities || threats) &&
                <SwotTable strengths={strength} weaknesses={weaknesses} opportunities={opportunities}
                           threats={threats}/>}
            <h2>Clusters</h2>

            {tableData && <ClusterTable clusters={tableData.clusters.clusters}/>}
            <h2>Critical success factors</h2>

            {tableData && <CsfTable clusters={tableData.clusters.clusters}/>}
            <h2>Strategy</h2>

            {tableData && <StrategyTable clusters={tableData.clusters}/>}


            <ReportImport/>

            <h2>KPI Extracted</h2>
            <KpiActualTargets />

            <h2>KPI</h2>
            {tableData && <CSFKPITable clusters={tableData.clusters.clusters}/>}

            <h2>Mapping</h2>
            {tableData && <PerspectiveKPITable clusters={tableData.clusters.clusters}/>}


            <h2>Radar</h2>
            {tableData && <RadarChart clusters={tableData.clusters.clusters}/>}


        </>
    );
};

export default SwotList;
