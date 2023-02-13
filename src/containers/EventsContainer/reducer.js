import {
  FETCH_EVENTS_SUCCESS_ACTION,
  EDIT_EVENTS_SUCCESS_ACTION,
  DELETE_EVENTS_SUCCESS_ACTION,
} from "./action";

const initialState = {
  error: false,
};

export default function (state: any = initialState, action: Function) {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS_ACTION:
      return {
        ...state,
        EventsList: action.payload.event_list,
      };

    case EDIT_EVENTS_SUCCESS_ACTION:
      return {
        ...state,
        EventsList: state.EventsList.map((events) =>
          events.id === action.payload.id ? action.payload : events
        ),
      };
    case DELETE_EVENTS_SUCCESS_ACTION:
      return {
        ...state,
        EventsList: state.EventsList.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return {
        ...state,
      };
  }
}
