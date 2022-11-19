import { model, Schema } from 'mongoose';

export const Order = model('Order', new Schema({
    table: {
        type: String,
        required: true,
    },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1
            },
            observation: {
                type: String,
            }
        }],
        required: true,
    },
    total: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
        default: 'WAITING',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}));
