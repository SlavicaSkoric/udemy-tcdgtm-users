// define a user model

const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name is required.'],
  },
  // postCount: Number,
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost',
    },
  ],
});

UserSchema.virtual('postCount').get(function () {
  // console.log('Hi!');
  return this.posts.length;
});
// virtual property-field added as a separate declaration on the UserSchema and not in the UserSchema definition above

UserSchema.pre('remove', function (next) {
  // this === joe
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

// register a model with mongoose under some name, here - 'user'
const User = mongoose.model('user', UserSchema);
// if mongo doesn't have a collection named 'user', we will make it here according to UserSchema
// this will be User class
// we will use the terms User model and User class here interchangeably
// it does not represent a single user but the entire collection of data

module.exports = User;
