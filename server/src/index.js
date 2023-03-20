import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
const app=express();
import userRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';

app.use(express.json());
app.use(cors());
app.use('/auth',userRouter);
app.use('/recipes',recipesRouter);


mongoose.connect('mongodb://127.0.0.1:27017/recipe_app');

app.listen(3000,()=>{
    console.log("server is running on 3000");

})
