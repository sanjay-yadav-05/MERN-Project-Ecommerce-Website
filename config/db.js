import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.mongoBD_url);
        console.log(`connected to ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;