
export interface KPI {
    name: string;
    formula: string;
    description: string;
    perspective: string;
    actuals: string;
    targets: string;
}

export interface SWOTItem {
    content: string;
    type: number;
    critical_success_factor: string;
    kpi: KPI;
}

export interface Cluster {
    name: string;
    strategy: string;
    mission: string;
    swot: SWOTItem[];
}

export interface Clusters {
    vision: string;
    mission_statement: string;
    clusters: Cluster[];
}

export interface TableData {
    clusters: Clusters
    required_kpi: any
}

export interface SaveData {
    swot: {
        strength: string;
        weaknesses: string;
        opportunities: string;
        threats: string;
    };

    requiredReport: string[];
    extractReport: string[];

    analysis: TableData;
}
