import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    username: string;
    password: string;
    matchPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
