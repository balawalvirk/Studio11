import {ITEMS, VIDEOS, CUTTINGS} from '../Types';
const intialState = {
  barberItems: [],
  cuttings: [],
  videos: [],
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ITEMS: {
      return {
        ...state,
        barberItems: action.payload,
      };
    }
    case VIDEOS: {
      return {
        ...state,
        videos: action.payload,
      };
    }
    case CUTTINGS: {
      return {
        ...state,
        cuttings: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
