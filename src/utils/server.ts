import dotenv from 'dotenv';
import {app} from '../app';
dotenv.config()
export const createServer=()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`listening on port ${process.env.PORT||8000}`);
    });
}



