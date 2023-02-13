import { put, takeEvery } from "redux-saga/effects";
import {
  FETCH_EVENTS_INIT_ACTION,
  FETCH_EVENTS_SUCCESS_ACTION,
  FETCH_EVENTS_FAIL_ACTION,
  ADD_EVENTS_INIT_ACTION,
  ADD_EVENTS_SUCCESS_ACTION,
  ADD_EVENTS_FAIL_ACTION,
  EDIT_EVENTS_INIT_ACTION,
  EDIT_EVENTS_SUCCESS_ACTION,
  EDIT_EVENTS_FAIL_ACTION,
  DELETE_EVENTS_INIT_ACTION,
  DELETE_EVENTS_SUCCESS_ACTION,
  DELETE_EVENTS_FAIL_ACTION,
} from "./action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appConfig } from "../../config";
import moment from "moment";

function* fetchEvents() {
  try {
    const res = yield fetch(`${appConfig.ip}/testGetEvents`, {
      method: "POST",
    });
    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch {}
      throw Object.assign(res, errJSON);
    } else {
      const resJSON = yield res.json();
      yield put({
        type: FETCH_EVENTS_SUCCESS_ACTION,
        payload: resJSON,
      });
    }
  } catch (err) {
    if (err.ok === false) {
      yield put({ type: FETCH_EVENTS_FAIL_ACTION, error: err });
    } else {
    }
  }
}

function* AddEvents(value) {
  try {
    let events = value.value;
    let name = value.names;

    const date = moment(new Date()).format("DD/MM/yyyy");

    const data = {
      title: events.title,
      description: events.description,
      date_added: date,
      publish: events.publish,
      search_tags: events.search_tags,
      featured_image: events.imgUrl.name,
      events_image: name,
    };

    console.log(data);
    let headers = new Headers();
    headers.set("Content-type", "application/json");

    const res = yield fetch(`${appConfig.ip}/testInsertEvent`, {
      method: "POST",
      Accept: "application/json",
      headers: headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch {
        throw Object.assign(res, errJSON);
      }
    } else {
      const resJSON = yield res.json();

      yield put({
        type: ADD_EVENTS_SUCCESS_ACTION,
        payload: resJSON,
      });
      yield toast.success("Events added successfully", {
        autoClose: 3000,
      });
      yield put({
        type: FETCH_EVENTS_INIT_ACTION,
      });
    }
  } catch (err) {
    if (err.ok === false) {
      console.log(err);
      yield put({
        type: ADD_EVENTS_FAIL_ACTION,
        error: err,
      });
    }
  }
}

function* EditEvents(value) {
  let events = value.value;
  let name = value.names;
  const data = {
    id: events.id,
    title: events.title,
    description: events.description,
    publish: events.publish,
    search_tags: events.search_tags,
    featured_image: events.imgUrl ? events.imgUrl.name : events.featured_image,
    events_image: name,
    date_added: events.date_added,
  };
  console.log(data);

  let headers = new Headers();
  headers.set("Content-type", "application/json");

  try {
    const res = yield fetch(`${appConfig.ip}/testUpdateEvent`, {
      method: "POST",
      Accept: "application/json",
      headers: headers,
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch {}
      throw Object.assign(res, errJSON);
    } else {
      const resJSON = yield res.json();
      yield put({
        type: EDIT_EVENTS_SUCCESS_ACTION,
        payload: resJSON,
      });
      yield toast.success("Events updated successfully", {
        autoClose: 3000,
      });
      yield put({ type: FETCH_EVENTS_INIT_ACTION });
    }
  } catch (err) {
    if (err.ok === false) {
      console.log(err);
      yield put({
        type: EDIT_EVENTS_FAIL_ACTION,
        error: err,
      });
    }
  }
}

function* deleteEvents(value) {
  const id = value.value;

  let headers = new Headers();
  headers.set("Content-type", "application/json");

  try {
    const res = yield fetch(`${appConfig.ip}/testDeleteEvent`, {
      method: "POST",
      Accept: "application/json",
      headers: headers,
      body: JSON.stringify({ del_id: id }),
    });

    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch {}
      throw Object.assign(res, errJSON);
    } else {
      yield put({
        type: DELETE_EVENTS_SUCCESS_ACTION,
        payload: id,
      });
      yield toast.success("Deleted successfully", {
        autoClose: 3000,
      });
      yield put({ type: FETCH_EVENTS_INIT_ACTION });
    }
  } catch (err) {
    if (err.ok === false) {
      yield put({ type: DELETE_EVENTS_FAIL_ACTION, error: err });
    } else {
    }
  }
}

export function* EventsActionWatcher() {
  yield takeEvery(FETCH_EVENTS_INIT_ACTION, fetchEvents);
  yield takeEvery(ADD_EVENTS_INIT_ACTION, AddEvents);
  yield takeEvery(EDIT_EVENTS_INIT_ACTION, EditEvents);
  yield takeEvery(DELETE_EVENTS_INIT_ACTION, deleteEvents);
}
