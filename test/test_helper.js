const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// global.Promise - a reference to the ES6 implementation of promises library inside of the nodejs environment

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => /* console.log('Good to go!') */ {
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});
// before hook - executed once before the entire test suite runs

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
  // ready to run the next test!
});
// hook - done before each test we run
// drop - take all the records inside of the users collection and just delete them, accepts a callback function to do after it's completed dropping
