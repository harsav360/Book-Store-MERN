import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();


// Route for Save a new Book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({ message: "Send all required fields:title,author,publishYear" });
      }
      const newBook = {
          title:request.body.title,
          author:request.body.author,
          publishYear:request.body.publishYear,
      };
      const book = await Book.create(newBook);
      response.status(201).send(book);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route to Get All Books from Database
  router.get('/', async (request,response) => {
      try
      {
          const books = await Book.find({});
          response.status(200).json({
              count:books.length,
              data:books
          });
      }
      catch(error)
      {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  });
  
  // Route to Get Book by ID from Database
  router.get('/:id', async (request,response) => {
      try
      {
          const {id} = request.params
  
          const book = await Book.findById(id);
          response.status(200).json(book);
      }
      catch(error)
      {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  });
  
  // Route to update a Book
  router.put('/:id',async (request,response) => {
      try
      {
          if (
              !request.body.title ||
              !request.body.author ||
              !request.body.publishYear
            ) {
              return response
                .status(400)
                .send({ message: "Send all required fields:title,author,publishYear" });
            }
  
            const {id} = request.params
  
            const result = await Book.findByIdAndUpdate(id,request.body);
  
            if(!result)
            {
              return response.status(404).send({message:"Book not found"});
            }
            else
            {
              return response.status(200).send({message:"Book updated Successfully"});
            }
  
      }
      catch(error)
      {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  });
  
  // Route for delete a book
  router.delete('/:id',async (request,response) => 
  {
      try
      {
          const {id} = request.params
  
          const result = await Book.findByIdAndDelete(id)
  
          if(!result)
          {
              return response.status(404).send({message:"Book not found"});
          }
          else
          {
              return response.status(200).send({message:"Book Deleted Successfully"});
          }
          
  
      }
      catch(error)
      {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  });
  export default router;