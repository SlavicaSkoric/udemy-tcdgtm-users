const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    // console.log(joe);
    joe.set('name', 'Alex');
    // console.log(joe);
    assertName(joe.save(), done);
  });

  it('a model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('a model class can update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can find a record with an ID and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('a user can have their likes incremented by 10', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});

// set - used whenever we want to change one of the properties on an object or on the model instance
// set & save methodology
