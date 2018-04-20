var supertest = require('supertest');

describe('EndusersController.list', () => {
  describe('#list()', () => {
    it('should return a list of endusers', (done) => {
      supertest(sails.hooks.http.app)
        .get('/endusers')
        .expect(200, done);
    });
  });
});
