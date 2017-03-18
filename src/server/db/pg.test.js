import pg from 'server/db/pg';
import {expect} from 'chai';

describe('db', () => {
  it('should support connecting', () => {
    const data = {id: 1, email_address: 'joshua.wyse@gmail.com'};
    return pg('strava_user').insert(data)
      .then(result => expect(result).to.deep.equal(data));
  });
});
