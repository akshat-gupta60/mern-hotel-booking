import express , {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myhotelRoutes from './routes/my-hotels';
import cookieParser from 'cookie-parser';
import path from 'path';
import  {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>
    console.log("Connected to MongoDB", 
        process.env.MONGODB_CONNECTION_STRING
    )
);



const app=express();

//this line is used to body of the api response to json format
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(cors( {
    origin: process.env.FRONTEND_URL,
    credentials: true,

}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myhotelRoutes);



app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });

app.listen(7000, ()=>{
    console.log("Server is running on port 7000");
})


