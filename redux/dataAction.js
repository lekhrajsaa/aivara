import { ActionTypes, dataActionType } from "./dataActionType";

export const Getting_Token = (token) => {
  return {
    type: ActionTypes.GET_TOKEN,
    payload: token,
  };
};

export const Getting_user_data = (res) => {
  return {
    type: ActionTypes.USER_DATA,
    payload: {
      userdata: res,
    },
  };
};

export const setImages = (res) => {
  return {
    type: ActionTypes.IMAGES,
    payload: res,
  };
};
