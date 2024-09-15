import React, { useState } from 'react';
import styles from '@/styles/SwotList.module.css';
import {json} from "node:stream/consumers";
import RadarChart from "@/components/Radar";
import StrategyTable from "@/components/StratTable";
import SwotTable from "@/components/SwotTable";

const SwotList = () => {

    // Initialize state for each input field
    const [strength, setStrength] = useState('Strong Brand Reputation');
    const [weaknesses, setWeaknesses] = useState('High Operating Costs');
    const [opportunities, setOpportunities] = useState('Strategic Partnerships');
    const [threats, setThreats] = useState('Intense Competition ');

    const [chartData, setChartData] = useState(null);
    const [tableData, setTableData] = useState(null)

    // Handle input change events
    const handleStrengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStrength(e.target.value);
    };

    const handleWeaknessesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeaknesses(e.target.value);
    };

    const handleOpportunitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpportunities(e.target.value);
    };

    const handleThreatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThreats(e.target.value);
    };

    // Handle form submission
    const analyze = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("Form submitted!"); // Log the submission to the console
        console.log("Strength:", strength);
        console.log("Weaknesses:", weaknesses);
        console.log("Opportunities:", opportunities);
        console.log("Threats:", threats);


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
                const data = await response.json();
                console.log("Success Of Chart:", data.data);

                console.log(data.data)

                setChartData(data.data.chart);
                setTableData(data.data);

            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
            <form onSubmit={analyze} className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <label>Strengths</label>
                <label>Weaknesses</label>
                <label>Opportunities</label>
                <label>Threats</label>

                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <input
                        className={styles.input}
                        type="text"
                        name="strength"
                        placeholder="Strength"
                        value={strength}
                        onChange={handleStrengthChange}
                    />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <input
                        className={styles.input}
                        type="text"
                        name="weaknesses"
                        placeholder="Weaknesses"
                        value={weaknesses}
                        onChange={handleWeaknessesChange}
                    />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <input
                        className={styles.input}
                        type="text"
                        name="opportunities"
                        placeholder="Opportunities"
                        value={opportunities}
                        onChange={handleOpportunitiesChange}
                    />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <input
                        className={styles.input}
                        type="text"
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
            {(strength || weaknesses || opportunities || threats) && <SwotTable strengths={strength} weaknesses={weaknesses} opportunities={opportunities} threats={threats} />}
            {tableData && <StrategyTable data={tableData} />}
            {chartData && <RadarChart chartData={chartData} />}


        </>
    );
};

export default SwotList;
