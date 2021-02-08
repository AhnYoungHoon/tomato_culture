const express = require('express');
const app=express();

const bodyParser=require('body-parser');
const cookieParser= require('cookie-parser');

const config =require('./config/key');
const { Post } =require('./models/Post');
const { auth } =require('./middleware/auth');

//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 갖고오게 해줌
app.use(bodyParser.urlencoded({extended: true}));

//json 타입으로 된거를 가져오게 해줌
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose= require('mongoose');

app.use('/api/users', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err));  

app.get('/', (req, res)=> res.send('Hello World! 안녕하세요!!'));


//
/*
app.post('/api/users/post', (req, res)=>{
  const posting= new Post(req.body);

  posting.save((err,doc)=>{
    if(err) return res.json({ success: false, err});
    return res.status(200).json({success: true});
  })
})
*/

const port =5000;
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));