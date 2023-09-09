import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import { Book } from "./models/bookModel.js";
import booksRoutes from './routes/booksRoutes.js'
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy

// Option 1: Allow All Origins with Default of cors(*)\
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders : ['Content-Type']
//     })
// )

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack");
});

app.use('/books',booksRoutes);

// Connecting with MongoDB datatabse using mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
