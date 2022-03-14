const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep it really is',
    });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;
    // mongoose magic
    // all of this is on the nodejs side of things, none of this has been persisted-saved in our db just yet

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        // console.log(user.blogPosts[0]);
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then((user) => {
        // console.log(user.blogPosts[0].comments[0]);
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(
          user.blogPosts[0].comments[0].content === 'Congrats on great post'
        );
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
      });
  });
});

// path - inside of the user that we fetch, we want to recursively load this additional resource
// path - means look into the user object, find the blogPosts property, attempt to load any associations that are in there (associated blogPosts)

// populate - means, inside of the path that we just got above, we want you to further go inside of there and attempt to load up this additional association; inside of all those blogPosts that you've just fetched, find the comments property and attempt to load up any associated comments that belong to the blogPosts
