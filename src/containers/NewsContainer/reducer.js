import {
  FETCH_NEWS_SUCCESS_ACTION,

  EDIT_NEWS_SUCCESS_ACTION,
  DELETE_NEWS_SUCCESS_ACTION
} from "./action";

const initialState = {
  error: false,
};

export default function (state: any = initialState, action: Function) {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS_ACTION:
      return {
        ...state,
        NewsList: action.payload.news_list
      };

 
    case EDIT_NEWS_SUCCESS_ACTION:
      return {
        ...state,
        NewsList: state.NewsList.map((news) =>
        news.id === action.payload.id ? action.payload : news
        ),
      };
    case DELETE_NEWS_SUCCESS_ACTION:

      return {
        ...state,
        NewsList: state.NewsList.filter(
          (item) => item.id !== action.payload
        )
      };

    default:
      return {
        ...state,
      };
  }
}
