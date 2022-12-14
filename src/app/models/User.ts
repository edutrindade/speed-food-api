import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    },
    active: {
        type: Boolean,
        default: true,
    }
}));
