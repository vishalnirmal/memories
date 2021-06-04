import {config} from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/post.js';
config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({
    extended: true,
    limit: "30mb"
}));

app.use("/posts", postRoutes);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`);
    });
})
.catch(error=>{
    console.log("Unable to start server "+error);
})