import  express  from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes  from './routes/authRoutes.js';
import morgan from "morgan";
import cors from "cors";

// envirnoment config
dotenv.config();

// connect to database
connectDB();

// server initialization
const app = express();

const port = process.env.port;
// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/v1/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send({message : 'Hello World'})
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
