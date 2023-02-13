export const FETCH_EVENTS_INIT_ACTION = "FETCH_EVENTS_INIT_ACTION";
export const FETCH_EVENTS_SUCCESS_ACTION =
  FETCH_EVENTS_INIT_ACTION + "_SUCCESS";
export const FETCH_EVENTS_FAIL_ACTION = FETCH_EVENTS_INIT_ACTION + "_ERROR";

export const ADD_EVENTS_INIT_ACTION = "ADD_EVENTS_INIT_ACTION";
export const ADD_EVENTS_SUCCESS_ACTION = ADD_EVENTS_INIT_ACTION + "_SUCCESS";
export const ADD_EVENTS_FAIL_ACTION = ADD_EVENTS_INIT_ACTION + "_ERROR";

export const EDIT_EVENTS_INIT_ACTION = "EDIT_EVENTS_INIT_ACTION";
export const EDIT_EVENTS_SUCCESS_ACTION = EDIT_EVENTS_INIT_ACTION + "_SUCCESS";
export const EDIT_EVENTS_FAIL_ACTION = EDIT_EVENTS_INIT_ACTION + "_ERROR";

export const DELETE_EVENTS_INIT_ACTION = "DELETE_EVENTS_INIT_ACTION";
export const DELETE_EVENTS_SUCCESS_ACTION =
  DELETE_EVENTS_INIT_ACTION + "_SUCCESS";
export const DELETE_EVENTS_FAIL_ACTION = DELETE_EVENTS_INIT_ACTION + "_ERROR";

export function fetchEvents() {
  return {
    type: FETCH_EVENTS_INIT_ACTION,
  };
}

export function AddEvents(value, names) {
  return {
    type: ADD_EVENTS_INIT_ACTION,
    value: value,
    names: names,
  };
}

export function EditEvents(value, names) {
  return {
    type: EDIT_EVENTS_INIT_ACTION,
    value: value,
    names: names,
  };
}

export function DeleteEvents(value) {
  return {
    type: DELETE_EVENTS_INIT_ACTION,
    value: value,
  };
}
