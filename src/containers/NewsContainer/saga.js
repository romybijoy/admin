import { put, takeEvery } from "redux-saga/effects";
import {
  FETCH_NEWS_INIT_ACTION,
  FETCH_NEWS_SUCCESS_ACTION,
  FETCH_NEWS_FAIL_ACTION,
  ADD_NEWS_INIT_ACTION,
  ADD_NEWS_SUCCESS_ACTION,
  ADD_NEWS_FAIL_ACTION,
  EDIT_NEWS_INIT_ACTION,
  EDIT_NEWS_SUCCESS_ACTION,
  EDIT_NEWS_FAIL_ACTION,
  DELETE_NEWS_INIT_ACTION,
  DELETE_NEWS_SUCCESS_ACTION,
  DELETE_NEWS_FAIL_ACTION,
} from "./action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appConfig } from "../../config";
import moment from "moment";

function* fetchNews() {
  try {
    const res = yield fetch(`${appConfig.ip}/testGetNews`, {
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
        type: FETCH_NEWS_SUCCESS_ACTION,
        payload: resJSON,
      });
    }
  } catch (err) {
    if (err.ok === false) {
      console.log(err);
      yield put({ type: FETCH_NEWS_FAIL_ACTION, error: err });
    } else {
    }
  }
}

function* AddNews(value) {
  try {
    let news = value.value;
    let name = value.names;

    const date = moment(new Date()).format("DD/MM/yyyy");

    const data = {
      title: news.title,
      description: news.description,
      date_added: date,
      publish: news.publish,
      search_tags: news.search_tags,
      featured_image: news.imgUrl.name,
      news_image: name,
    };

    console.log(data);
    let headers = new Headers();
    headers.set("Content-type", "application/json");

    const res = yield fetch(`${appConfig.ip}/testInsertNews`, {
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
        type: ADD_NEWS_SUCCESS_ACTION,
        payload: resJSON,
      });
      yield toast.success("News added successfully", {
        autoClose: 3000,
      });
      yield put({
        type: FETCH_NEWS_INIT_ACTION,
      });
    }
  } catch (err) {
    if (err.ok === false) {
      console.log(err);
      yield put({
        type: ADD_NEWS_FAIL_ACTION,
        error: err,
      });
    }
  }
}

function* EditNews(value) {
  let news = value.value;
  let name = value.names;
  const data = {
    id: news.id,
    title: news.title,
    description: news.description,
    publish: news.publish,
    search_tags: news.search_tags,
    featured_image: news.imgUrl ? news.imgUrl.name : news.featured_image,
    news_image: name,
    date_added: news.date_added,
  };
  console.log(data);

  let headers = new Headers();
  headers.set("Content-type", "application/json");

  try {
    const res = yield fetch(`${appConfig.ip}/testUpdateNews`, {
      method: "POST",
      Accept: "application/json",
      headers: headers,
      body: JSON.stringify(data),
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
        type: EDIT_NEWS_SUCCESS_ACTION,
        payload: resJSON,
      });
      yield toast.success("News updated successfully", {
        autoClose: 3000,
      });
      yield put({ type: FETCH_NEWS_INIT_ACTION });
    }
  } catch (err) {
    if (err.ok === false) {
      console.log(err);
      yield put({
        type: EDIT_NEWS_FAIL_ACTION,
        error: err,
      });
    }
  }
}

function* deleteNews(value) {
  const id = value.value;

  let headers = new Headers();
  headers.set("Content-type", "application/json");

  try {
    const res = yield fetch(`${appConfig.ip}/testDeleteNews`, {
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
        type: DELETE_NEWS_SUCCESS_ACTION,
        payload: id,
      });
      yield toast.success("Deleted successfully", {
        autoClose: 3000,
      });
      yield put({ type: FETCH_NEWS_INIT_ACTION });
    }
  } catch (err) {
    if (err.ok === false) {
      yield put({ type: DELETE_NEWS_FAIL_ACTION, error: err });
    } else {
    }
  }
}

export function* NewsActionWatcher() {
  yield takeEvery(FETCH_NEWS_INIT_ACTION, fetchNews);
  yield takeEvery(ADD_NEWS_INIT_ACTION, AddNews);
  yield takeEvery(EDIT_NEWS_INIT_ACTION, EditNews);
  yield takeEvery(DELETE_NEWS_INIT_ACTION, deleteNews);
}
