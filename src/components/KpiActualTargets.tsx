import React from 'react';
import {useRequiredReport} from "@/contexts/ReportContext";

const CSFKPITable = () => {
    const { requiredReport, extractedReport, setRequiredReport, setExtractedReport } = useRequiredReport();

    return (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', border: '1px solid white' }}>
            <thead>
            <tr style={{borderBottom: '1px solid white'}}>
                <th style={{border: '1px solid white'}}>KPI Name</th>
                <th style={{border: '1px solid white'}}>KPI Value</th>
            </tr>
            </thead>
            <tbody>
            {requiredReport.map((name, index) => (
                <tr key={`${name}`} style={{borderBottom: '1px solid white'}}>
                    <td style={{border: '1px solid white', padding: '8px'}}>
                        {name}
                    </td>
                    <td style={{border: '1px solid white', padding: '8px'}}>
                        EXTRACTED
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CSFKPITable;
