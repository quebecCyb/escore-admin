import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    name: string;
    user: string; // Ссылка на идентификатор пользователя
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ссылка на модель User
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
