import React, { useState } from 'react';
import styles from '@/styles/SwotList.module.css';
import {json} from "node:stream/consumers";

const SwotList = () => {
    // Initialize state for each input field
    const [strength, setStrength] = useState('Strong Brand Reputation');
    const [weaknesses, setWeaknesses] = useState('High Operating Costs');
    const [opportunities, setOpportunities] = useState('Strategic Partnerships');
    const [threats, setThreats] = useState('Intense Competition ');

    // Initialize state for critical success factors
    const [csf, setCsf] = useState('');
    const [chart, setChart] = useState('');
    const [mission, setMission] = useState('');
    const [strategy, setStrategy] = useState('');
    const [vision, setVision] = useState('');

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

        // Create the payload object
        const payload = {
            Strength: strength,
            Weaknesses: weaknesses,
            Opportunities: opportunities,
            Threats: threats
        };

        try {
            // Make a POST request to the server
            console.log('Make a POST request to the server')
            const response = await fetch('/api/swot/csf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Handle success
                const data = await response.json();
                console.log("Success:", data);

                setCsf(data.map( (e: any) => `${e.content} <br>`))
                getChart();
            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }


        try {
            // Make a POST request to the server
            const response = await fetch('/api/swot/mission', { // http://162.19.233.237:4040/swot/mission
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Handle success
                const data = await response.text();
                console.log("Success:", data);

                setMission(data)

            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }


        try {
            // Make a POST request to the server
            const response = await fetch('/api/swot/vision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Handle success
                const data = await response.text();
                console.log("Success:", data);

                setVision(data)

            } else {
                // Handle error
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        try {
            // Make a POST request to the server
            const response = await fetch('/api/swot/strategy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Handle success
                const data = await response.json();
                console.log("Success:", data);

                setStrategy(JSON.stringify(data))

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
            const response = await fetch('/api/swot/chart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    strength,
                    weaknesses,
                    opportunities,
                    threats,
                    csf: csf.toString()
                })
            });

            if (response.ok) {
                // Handle success
                const data = await response.text();
                console.log("Success Of Chart:", data);

                setChart(data)

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

            <h2 className="mb-5">Chart</h2>
            <pre dangerouslySetInnerHTML={{__html: chart}}></pre>

            <h2 className="mb-5">Critical Success Factors</h2>
            <p dangerouslySetInnerHTML={{__html: csf}}></p>


            <h2>Objective Missions</h2>
            <p dangerouslySetInnerHTML={{__html: mission}}></p>


            <h2>Strategy</h2>
            <p dangerouslySetInnerHTML={{__html: strategy}}></p>

            <h2>Objective Vision</h2>
            <p dangerouslySetInnerHTML={{__html: vision}}></p>
        </>
    );
};

export default SwotList;
