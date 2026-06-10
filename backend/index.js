import express from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
//
import userRoutes from './routes/auth.routes.js';

// dns
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// dot env
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// this is get request
// http://localhost:8000
app.get('/',(req,res) =>{
    res.send('i am coming form backend');
}) 

// this is post request
// http://localhost:8000/user/signup
 
app.use('/user',userRoutes);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
try {
    await mongoose.connect(process.env.mongodbURI);
    console.log("MongoDB connected");
} catch(error) {
    console.error("MongoDB connection error:", error);
}