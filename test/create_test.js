const assert = require('assert');
// we got this assert when installing mocha
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    // assert(1 + 1 === 2);

    const joe = new User({
      name: 'Joe',
    });
    // we use the User model/class to create a new User instance - joe
    // joe is the instance of the User model/class

    joe.save().then(() => {
      // has joe been saved successfully?
      assert(!joe.isNew);
      done();
    });
  });
});

// describe block, describe function
// it block, it function
// they (it blocks) get queued up and run one after another in our test suite in mocha
// assertion (mocha records the value returned from assert)
// if there is no assert, mocha assumes that the test passed

// we use cli to run our test suite
