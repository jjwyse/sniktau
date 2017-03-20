import {save, load, invalidate} from 'util/storage';
import {expect} from 'chai';

describe('storage', () => {
  it('should support saving and loading the users token', () => {
    const user = {token: 'abc', email: 'frank.ricard@oldschool.com'};
    save(user);

    const loadedUser = load();
    expect(loadedUser).to.deep.equal(user);

    invalidate();
    const noUser = load();
    expect(noUser).to.be.null;
  });
});
