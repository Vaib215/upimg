const express = require('express')
const mongoose = require('mongoose');
const multer = require('multer')
const app = express();
const File = require('./models/File')
const upload = multer({dest: 'uploads'})
const cors = require('cors')
app.use(cors())
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb+srv://image-upload-admin:iuadmin123@cluster0.9mk7hzh.mongodb.net/?retryWrites=true&w=majority", ()=>{
  console.log("MongoDB Connected")
})

app.use(express.json())

app.post('/', upload.single("file") , async(req,res)=>{
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname
  }
  const file = await File.create(fileData)
  res.json(`https://image-uploader-backend.vaib215.repl.co/${file.id}`)
})

app.get("/:id",async(req,res)=>{
  const file = await File.findById(req.params.id);
  await file.save();
  res.download(file.path, file.originalName)
})

app.listen(3000, ()=> {
  console.log("Server Started")
})