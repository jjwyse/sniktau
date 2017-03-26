import {CALL_API} from 'state/types';

/* Constants */
export const LOADED = 'PEAKS:LOADED';

/* Actions */
const loadAllPeaks = () => {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: '/peaks',
      types: [LOADED],
      message: 'Loading peaks...',
    },
  };
};

/* Reducer */
const initialState = {loaded: false, all: []};
const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOADED:
      return {...state, loaded: true, all: payload};
    default:
      return state;
  }
};

export {reducer, loadAllPeaks};
