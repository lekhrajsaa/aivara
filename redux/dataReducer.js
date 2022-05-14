import { ActionTypes } from "./dataActionType";

const aivaraStatus = {
  userdata: [],
  lab_images: [],
  modelimge: {},
};

export const user = (state = aivaraStatus, action) => {
  switch (action.type) {
    case ActionTypes.USER_DATA:
      return { ...state, userdata: action.payload.userdata };

    case ActionTypes.IMAGES:
      return { ...state, lab_images: action.payload };
    case ActionTypes.MODELIMAGE:
      return { ...state, modelimge: action.payload };
    default:
      return state;
  }
};
