import { model, Schema } from 'mongoose';

export const Cashier = model('Cashier', new Schema({
    openDate: {
        type: Date,
        required: true,
    },
    closeDate: {
        type: Date,
    },
    openValue: {
        type: Number,
        required: true,
    },
    closeValue: {
        type: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED'],
        default: 'OPEN',
    }
}));
