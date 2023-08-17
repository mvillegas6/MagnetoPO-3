import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbConection = () => {
    mongoose
        .connect(process.env.DB_URL!)
        .then(() => {
            console.log('Database connected');
        })
        .catch((err) => {
            console.log(err);
        });
};
