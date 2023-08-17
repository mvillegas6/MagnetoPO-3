import express from 'express';
import { Request, Response } from 'express';
import { dbConection } from './database';

const app = express();

dbConection();

app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
});

app.listen(3000, () => {
    console.log('Application started on port 3000!');
});
