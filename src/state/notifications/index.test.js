import {expect} from 'chai';

import {reducer} from 'state/notifications';
import {NOTIFICATIONS_MASK, NOTIFICATIONS_MASK_REMOVE} from 'state/types';

describe('notifications', () => {
  context('reducer', () => {
    it('should support NOTIFICATIONS_MASK and NOTIFICATIONS_MASK_REMOVE', () => {
      const initialState = null;
      const action = {type: NOTIFICATIONS_MASK, payload: {message: 'abc'}};
      const nextState = reducer(initialState, action);

      expect(nextState.mask).to.deep.equal(action.payload);

      const action2 = {type: NOTIFICATIONS_MASK_REMOVE};
      const nextState2 = reducer(nextState, action2);

      expect(nextState2.mask).to.be.null;
    });
  });
});
