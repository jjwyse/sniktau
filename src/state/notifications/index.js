import {NOTIFICATIONS_MASK, NOTIFICATIONS_MASK_REMOVE} from 'state/types';

const initialState = {masks: []};
const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case NOTIFICATIONS_MASK:
      const newMasks = state.masks.concat([payload]);
      return Object.assign({}, state, {masks: newMasks});
    case NOTIFICATIONS_MASK_REMOVE:
      const removedMasks = state.masks.concat([]);
      removedMasks.pop();
      return Object.assign({}, state, {masks: removedMasks});
    default:
      return state;
  }
};

export {reducer};
