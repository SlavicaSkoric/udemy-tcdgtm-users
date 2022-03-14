const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    // joe & blogPost
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep it really is',
    });

    // the association between the two
    joe.blogPosts.push(blogPost);
    // mongoose magic
    // all of this is on the nodejs side of things, none of this has been persisted-saved in our db just yet

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
