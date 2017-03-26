import {NOTIFICATIONS_MASK, NOTIFICATIONS_MASK_REMOVE} from 'state/types';

const initialState = {mask: {}};
const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case NOTIFICATIONS_MASK:
      return Object.assign({}, state, {mask: payload});
    case NOTIFICATIONS_MASK_REMOVE:
      return Object.assign({}, state, {mask: null});
    default:
      return state;
  }
};

export {reducer};
