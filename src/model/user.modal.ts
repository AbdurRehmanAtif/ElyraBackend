import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the User document
interface UserDocument extends Document {
    _id: string;
    username?: string;
    email: string;
    watchHistory: mongoose.Types.ObjectId[];
    salt: string;
    hash: string;
    role?: string;
}

// Define the interface for the User model
interface UserModel extends Model<UserDocument> {
    findByEmail(email: string): Promise<UserDocument | null>;
}

// Define the user schema
const userSchema = new mongoose.Schema<UserDocument>({
    _id: {
        type: String,
    },
    username: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    salt: {
        type: String,
        required: [true, "Password is required"]
    },
    hash: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

// Define the static method on the schema
userSchema.statics.findByEmail = async function(email: string): Promise<UserDocument | null> {
    try {
        // Attempt to find a user with the provided email
        const user = await this.findOne({ email: email });
        // Handle the case where no user is found
        if (!user) {
            return null;
            // Handle the error or return an appropriate response
        }
        return user;
    } catch (error) {
        return null;
    }
};

// Create the User model
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
