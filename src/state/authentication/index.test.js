import {expect} from 'chai';

import {reducer, LOGGED_IN} from 'state/authentication';

describe('authentication', () => {
  context('reducer', () => {
    it('should support LOGGED_IN', () => {
      const initialState = null;
      const action = {type: LOGGED_IN, payload: {token: 'abc', email: 'j@j.com'}};
      const nextState = reducer(initialState, action);

      expect(nextState.user).to.deep.equal(action.payload);
    });
  });
});
