const mongoose= require('mongoose');
const Schema = mongoose.Schema;



const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        maxlength:50,
        ref: 'User'
    },
    content: {
        type: String,
        maxlength:310,
        minlength:2
    },
    image: String, 
    createdAt: {
      type: Date,
      default: Date.now,
    }
});


const Post = mongoose.model('Post', postSchema);
module.exports={Post}