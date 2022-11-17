import { model, Schema } from 'mongoose';

export const Product = model('Product', new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            }
        }],
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    inventory: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true,
    }
}));