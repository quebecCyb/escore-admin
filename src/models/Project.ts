// Imports and Interfaces
import mongoose, {Document, Schema, Model, Types} from 'mongoose';
import { SaveData, TableData, KPI, SWOTItem, Cluster, Clusters } from "@/schemas/Analysis";

// IProject interface with SaveData type for snapshot
export interface IProject extends Document {
    name: string;
    snapshot: SaveData;
    user: Types.ObjectId;  // Reference to the user identifier
}

// Define the KPI schema
const KpiSchema = new Schema({
    name: { type: String, required: true },
    formula: { type: String, required: true },
    description: { type: String, required: true },
    perspective: { type: String, required: true },
    actuals: { type: String, required: true },
    targets: { type: String, required: true },
});

// Define the SWOTItem schema
const SwotItemSchema = new Schema({
    content: { type: String, required: true },
    type: { type: Number, required: true },
    critical_success_factor: { type: String, required: true },
    kpi: { type: KpiSchema, required: true },
});

// Define the Cluster schema
const ClusterSchema = new Schema({
    name: { type: String, required: true },
    strategy: { type: String, required: true },
    mission: { type: String, required: true },
    swot: { type: [SwotItemSchema], required: true },
});

// Define the Clusters schema
const ClustersSchema = new Schema({
    vision: { type: String, required: true },
    mission_statement: { type: String, required: true },
    clusters: { type: [ClusterSchema], required: true },
});

// Define the TableData schema
const TableDataSchema = new Schema({
    clusters: { type: ClustersSchema, required: true },
    required_kpi: Schema.Types.Mixed,
});

// Define the SaveData schema with nested structures
const SaveDataSchema = new Schema({
    swot: {
        strength: { type: String, required: true },
        weaknesses: { type: String, required: true },
        opportunities: { type: String, required: true },
        threats: { type: String, required: true },
    },
    requiredReport: [{ type: String, required: true }],
    extractReport: [{ type: String, required: true }],
    analysis: { type: TableDataSchema, required: true },
});

// Define the Project schema, referencing SaveDataSchema for snapshot
const ProjectSchema: Schema<IProject> = new Schema({
    name: { type: String, required: true },
    snapshot: { type: SaveDataSchema, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Export the model with explicit typing for IProject
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
