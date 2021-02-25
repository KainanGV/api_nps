import 'reflect-metadata';
import express from 'express';
import './database/database';
import { router } from './routes';

const app = express();

app.use(express.json())
app.use(router)

const PORT = '8081'
app.listen(PORT, () => {
    console.log("SERVER ROLANDO")
})

