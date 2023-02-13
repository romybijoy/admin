import { combineReducers } from 'redux';
import NewsReducer from '../containers/NewsContainer/reducer';
import EventsReducer from '../containers/EventsContainer/reducer';

const rootReducer = combineReducers({
    NewsReducer,
    EventsReducer,
});

export default rootReducer;