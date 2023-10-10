import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

// database management

// mongodb cluster mongodb+srv://books:root@projects.o6szpm2.mongodb.net/?retryWrites=true&w=majority


mongoose.connect("mongodb+srv://books:root@projects.o6szpm2.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
      useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to db server")
})
.catch((err)=>{
    console.log("db connection failed ",err)
})

// import db book model
import { BookModel } from './models/bookmodel.js'

//  server management
const app = express()
const  port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin: 'https://book-list-o1co.onrender.com', methods:'GET, POST, PUT, DELETE', credentials: true}))
// config

app.use(function(req, res, next) {
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.get('/', (req,res)=>{
      res.send('hello world !!! 4')
})

app.post('/books', async (req,res)=>{
      const Newbook = new BookModel(req.body)
      await Newbook.save().then((data)=>{
        res.send("<p>Data saved successfully !</p> <a href='https://book-list-o1co.onrender.com'>Go back</a>")
      })
      .catch((err)=>{
        res.send("You havent inputed data properly")
      })
})

app.get('/books', async(req,res)=>{
    await BookModel.find({})
    .then((data)=>{
        const newData = data.map(item=> `
        <p>${data.indexOf(item)+1}</p>
        <p>Title:${item.title}</p>
        <p>Author:${item.author}</p>
        <p>Publish year:${item.publishYear}</p>
        `)
        res.send(data)


    })
    .catch((err)=>{
          res.send(err)
    })
})


app.get('/books/:id', async(req,res)=>{
    await BookModel.find({_id: req.params.id})
    .then((data)=>{
        const newData = data.map(item=> `
        <p>${data.indexOf(item)+1}</p>
        <p>Title:${item.title}</p>
        <p>Author:${item.author}</p>
        <p>Publish year:${item.publishYear}</p>
        `)
        res.send(data)



    })
    .catch((err)=>{
          res.send(err)
    })
})




app.put('/books/:id',async(req,res)=>{
    await BookModel.findOneAndUpdate({_id: req.params.id},req.body)
    .then((data)=>{
        const newData = data.map(item=> `
        <p>${data.indexOf(item)+1}</p>
        <p>Title:${item.title}</p>
        <p>Author:${item.author}</p>
        <p>Publish year:${item.publishYear}</p>
        `)
        res.send('Updated successfully')



    })
    .catch((err)=>{
          res.send("Inputed incorrectly")
    })
})

app.delete('/books/:id',async(req,res)=>{
    await BookModel.findOneAndDelete({_id: req.params.id}, req.body)
    .then((data)=>{
        const newData = data.map(item=> `
        <p>${data.indexOf(item)+1}</p>
        <p>Title:${item.title}</p>
        <p>Author:${item.author}</p>
        <p>Publish year:${item.publishYear}</p>
        `)
        res.send("Deleted sucessfully")
        console.log('item deleted')



    })
    .catch((err)=>{
          res.send(err)
    })
})




app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

