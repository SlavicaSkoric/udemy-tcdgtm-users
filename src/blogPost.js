const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});

// in the comments' configuration object, we specify the type of this reference, the type that's going to sit inside there; this type is going to point off to a record that's sitting in a different collection, so we are not nesting documents here, we are passing a reference off to another model or another document sitting in the comment collection
// ref will be matched up against the model definition

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
