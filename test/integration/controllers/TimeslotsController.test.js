var supertest = require('supertest');

describe('TimeslotsController.list', () => {
  describe('#list()', () => {
    it('should return a list of timeslots', (done) => {
      supertest(sails.hooks.http.app)
        .get('/timeslots')
        .expect(200, done);
    });
  });
});
