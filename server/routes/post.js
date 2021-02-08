const express = require('express');
const router=express.Router();
const {Post}=require("../models/Post");
const path=require('path');
const fs=require('fs');
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)

        //const ext=path.extname(file.originalname);
        //cb(null, path.basename(file.originalname, ext)+ Date.now()+ext);
    }
  })
  
var upload = multer({ storage: storage }).single('file');

router.post('/uploadfiles', (req, res)=>{
  upload(req, res, err=>{
    if(err){
      return res.json({success: false, err});
    }
    return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
  })
})

router.post('/uploadPost', (req, res)=>{
    const post=new Post(req.body); //req.body에 우리가 보낸 모든정보가 들어있음
    post.save((err, doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({success: true});
    });
})

router.get('/getPost', (req, res)=>{
    Post.find()
      .populate('writer')
      .exec((err,posts)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, posts});
      })
})

module.exports = router;
