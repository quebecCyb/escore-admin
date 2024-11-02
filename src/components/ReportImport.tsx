import React, {ChangeEvent, useState} from 'react';
import {useRequiredReport} from "@/contexts/ReportContext";

const ReportImport = () => {
    const { requiredReport, extractedReport, setRequiredReport, setExtractedReport } = useRequiredReport();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Обработчик изменения файла
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target && e.target.files ? e.target.files[0] : null;
        if(file)
            setSelectedFile(file);
    };

    // Обработчик изменения текстового поля
    const handleRequiredChange = (e) => {
        setRequiredReport(e.target.value);
    };

    // Отправка файла и текстового поля на сервер
    const handleFileUpload = async () => {
        if (selectedFile && requiredReport) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('required', requiredReport.toString());

            try {
                // Отправка данных на бекенд Next.js
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                } as any);


                if (response.ok) {
                    const resp = await response.json()

                    console.log('File and required field successfully uploaded to Next.js backend');
                    console.log(resp);

                    setExtractedReport(resp['data']['values']);

                } else {
                    console.error('Failed to upload file and required field');
                    console.error(response)
                }
            } catch (error) {
                console.error('Error while uploading file and required field:', error);
            }
        } else {
            alert('Please select a file and enter the required field');
        }
    };

    return (
        <div>
            <h2>Report Import</h2>

            <div>
                <p><strong>Report Required:</strong> {requiredReport}</p>
                <p><strong>Report Extracted:</strong> {extractedReport}</p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFileUpload();
                }}
            >
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter required field"
                    value={`${requiredReport}`}
                    onChange={handleRequiredChange}
                    required
                />
                <button type="submit">Import Report</button>
            </form>
        </div>
    );
};

export default ReportImport;
