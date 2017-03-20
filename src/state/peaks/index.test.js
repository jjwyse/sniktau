import {expect} from 'chai';

import {reducer, LOADED} from 'state/peaks';

describe('authentication', () => {
  context('reducer', () => {
    it('should support LOGGED_IN', () => {
      const initialState = null;
      const action = {type: LOADED, payload: [{name: 'sniktau', elevation: 1000}]};
      const nextState = reducer(initialState, action);

      expect(nextState.all).to.deep.equal(action.payload);
      expect(nextState.loaded).to.be.true;
    });
  });
});
