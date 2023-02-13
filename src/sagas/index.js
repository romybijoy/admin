import { call, all } from 'redux-saga/effects'
import {NewsActionWatcher} from '../containers/NewsContainer/saga'
import {EventsActionWatcher} from '../containers/EventsContainer/saga'

function* rootSaga() {
  yield all([
    call(NewsActionWatcher),
    call(EventsActionWatcher),
  ])
}

export default rootSaga