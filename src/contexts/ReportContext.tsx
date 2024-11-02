import React, { createContext, useContext, useState, ReactNode } from 'react';

// Определяем интерфейс для значений контекста
interface RequiredReportContextType {
    requiredReport: string[];
    setRequiredReport: React.Dispatch<React.SetStateAction<string[]>>;
    extractedReport: string[];
    setExtractedReport: React.Dispatch<React.SetStateAction<string[]>>;
}

// Создаем контекст с начальным значением null, чтобы указать, что он будет определен позже
const RequiredReportContext = createContext<RequiredReportContextType | undefined>(undefined);

// Провайдер контекста
export const RequiredReportProvider = ({ children }: { children: ReactNode }) => {
    const [requiredReport, setRequiredReport] = useState<string[]>([]);
    const [extractedReport, setExtractedReport] = useState<string[]>([]);

    return (
        <RequiredReportContext.Provider value={{ requiredReport, setRequiredReport, extractedReport, setExtractedReport }}>
    {children}
    </RequiredReportContext.Provider>
);
};

// Хук для доступа к requiredReport, extractedReport и их функциям обновления
export const useRequiredReport = () => {
    const context = useContext(RequiredReportContext);
    if (context === undefined) {
        throw new Error('useRequiredReport must be used within a RequiredReportProvider');
    }
    return context;
};
