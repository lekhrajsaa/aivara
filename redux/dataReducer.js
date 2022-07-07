import { ActionTypes } from "./dataActionType";

const aivaraStatus = {
  userdata: [],
  lab_images: [],
  modelimge: {},
  reportDataFrom_AI: {},
};

export const user = (state = aivaraStatus, action) => {
  switch (action.type) {
    case ActionTypes.USER_DATA:
      return { ...state, userdata: action.payload.userdata };

    case ActionTypes.IMAGES:
      return { ...state, lab_images: action.payload };
    case ActionTypes.MODELIMAGE:
      return { ...state, modelimge: action.payload };
    case ActionTypes.REPORT_DATA_FROM_AI:
      return { ...state, reportDataFrom_AI: action.payload };
    default:
      return state;
  }
};
