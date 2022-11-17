import express from 'express';
import path from 'node:path';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        const app = express();
        const port = 3030;

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
        app.use(express.json());
        app.use(router);

        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
        console.log('Connected to MongoDB...');
    }).catch(err => console.error('Could not connect to MongoDB...'));

