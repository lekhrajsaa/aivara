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

export const setDetailData = (data) => {
  return {
    type: ActionTypes.DETAIL_DATA,
    payload: data,
  };
}

// for going back to previous page from detail page
export const setPrevPage = (data) => {
  return {
    type: ActionTypes.PREV_PAGE,
    payload: data,
  };
}

export const setNotification = (data) => {
  return {
    type: ActionTypes.NOTIFICATION,
    payload: data,
  };
}

// for socket connection ( true or false )
export const setSocketConn = (data) => {
  return {
    type: ActionTypes.SOCKET_CONN,
    payload: data,
  };
}