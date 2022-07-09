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
export const setmodelimage = (res) => {
  return {
    type: ActionTypes.MODELIMAGE,
    payload: res,
  };
};

export const setAiReportData = (data) => {
  return {
    type: ActionTypes.REPORT_DATA_FROM_AI,
    payload: data,
  };
}

export const setReportTableData = (data) => {
  return {
    type: ActionTypes.REPORT_TABLE_DATA,
    payload: data,
  };
}
