export const FETCH_NEWS_INIT_ACTION = "FETCH_NEWS_INIT_ACTION";
export const FETCH_NEWS_SUCCESS_ACTION = FETCH_NEWS_INIT_ACTION + "_SUCCESS";
export const FETCH_NEWS_FAIL_ACTION = FETCH_NEWS_INIT_ACTION + "_ERROR";

export const ADD_NEWS_INIT_ACTION = "ADD_NEWS_INIT_ACTION";
export const ADD_NEWS_SUCCESS_ACTION = ADD_NEWS_INIT_ACTION + "_SUCCESS";
export const ADD_NEWS_FAIL_ACTION = ADD_NEWS_INIT_ACTION + "_ERROR";

export const EDIT_NEWS_INIT_ACTION = "EDIT_NEWS_INIT_ACTION";
export const EDIT_NEWS_SUCCESS_ACTION = EDIT_NEWS_INIT_ACTION + "_SUCCESS";
export const EDIT_NEWS_FAIL_ACTION = EDIT_NEWS_INIT_ACTION + "_ERROR";

export const DELETE_NEWS_INIT_ACTION = "DELETE_NEWS_INIT_ACTION";
export const DELETE_NEWS_SUCCESS_ACTION = DELETE_NEWS_INIT_ACTION + "_SUCCESS";
export const DELETE_NEWS_FAIL_ACTION = DELETE_NEWS_INIT_ACTION + "_ERROR";

export function fetchNews() {
  return {
    type: FETCH_NEWS_INIT_ACTION,
  };
}

export function AddNews(value, names) {
  return {
    type: ADD_NEWS_INIT_ACTION,
    value: value,
    names: names,
  };
}

export function EditNews(value, names) {
  return {
    type: EDIT_NEWS_INIT_ACTION,
    value: value,
    names: names,
  };
}

export function DeleteNews(value) {
  return {
    type: DELETE_NEWS_INIT_ACTION,
    value: value,
  };
}
