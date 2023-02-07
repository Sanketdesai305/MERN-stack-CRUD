import express,{Application, Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import userRoute from './Routes/user';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import {createServer} from './utils/server';
dotenv.config();

export const app: Application = express();

createServer();
app.use("/",userRoute);
app.use(bodyParser.json());

app.use(cors());
mongoose.connect("mongodb+srv://user:user@cluster0.1e7wu.mongodb.net/ineuron?retryWrites=true&w=majority").then(()=>{
    console.log("DB connection successfull!")
}).catch((err)=>{console.log(err)});




