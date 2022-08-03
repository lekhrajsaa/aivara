import { ActionTypes } from "./dataActionType";

const aivaraStatus = {
  userdata: [],
  lab_images: [],
  modelimge: {},
  reportDataFrom_AI: {},
  reportTableData: {},
  detailData: {},
  notification: [],
  prevPage: "/home",
  socket_conn: {}
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
    case ActionTypes.REPORT_TABLE_DATA:
      return { ...state, reportTableData: action.payload };
    case ActionTypes.DETAIL_DATA:
      return { ...state, detailData: action.payload };
    case ActionTypes.PREV_PAGE:
      return { ...state, prevPage: action.payload };
    case ActionTypes.NOTIFICATION:
      return { ...state, notification: action.payload };
    case ActionTypes.SOCKET_CONN:
      return { ...state, socket_conn: action.payload };
    default:
      return state;
  }
};
