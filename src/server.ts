import 'reflect-metadata';
import express from 'express';
import './database/database';

const app = express();

app.get('/', (req,res) => {
    return res.json({message: "Passando um JSON"})
})

const PORT = '8081'
app.listen(PORT, () => {
    console.log("SERVER ROLANDO")
})

