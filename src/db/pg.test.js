import pg from 'db/pg';

describe('db', () => {
  it('should support connecting', () => {
    return pg('strava_user').insert({id: 1, email_address: 'joshua.wyse@gmail.com'})
      .then(result => {
        console.log(result);
      });
  });
});
