import {CUTTINGS, VIDEOS, ITEMS} from '../Types';
export const setCuttings = (payload) => {
  return {
    type: CUTTINGS,
    payload: payload,
  };
};
export const setVideos = (payload) => {
  return {
    type: VIDEOS,
    payload: payload,
  };
};
export const setItems = (payload) => {
  return {
    type: ITEMS,
    payload: payload,
  };
};
