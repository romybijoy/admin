import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { appConfig } from "../config";

class EventsService {
  retriveAllEvents() {
    return axios.post(`${appConfig.ip}/testGetEvents`);
  }

  addEvents(events, name) {
    console.log(events);

    const date = moment(new Date()).format("DD/MM/yyyy");

    const data = {
      title: events.title,
      full_descripton: events.full_descripton,
      short_descripton: events.short_descripton,
      location: events.location,
      date_added: date,
      search_tags: events.search_tags,
      featured_image: events.imgUrl.name,
      events_image: name,
    };
    console.log(data);
    axios
      .post(`${appConfig.ip}/testInsertEvent`, data)
      .then(() => {
        toast.success("Events added successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("Events addition failed", {
          autoClose: 2000,
        });
      });
  }

  editEvents(events, name) {
    console.log(events);

    const date = moment(new Date()).format("DD/MM/yyyy");

    const data = {
      id: events.id,
      title: events.title,
      full_descripton: events.full_descripton,
      short_descripton: events.short_descripton,
      location: events.location,
      date_added: date,
      search_tags: events.search_tags,
      featured_image: events.imgUrl
        ? events.imgUrl.name
        : events.featured_image,
      events_image: name,
    };
    console.log(data);
    axios
      .post(`${appConfig.ip}/testUpdateEvent`, data)
      .then(() => {
        toast.success("Events updated successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("Events updation failed", {
          autoClose: 2000,
        });
      });
  }

  deleteEventsById(id) {
    axios
      .post(`${appConfig.ip}/testDeleteEvent`, { del_id: id })
      .then((data) => {
        toast.success("Deleted successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  }

  getEventsByid(id) {
    console.log("service" + id);

    return axios.get(`${appConfig.ip}/testGetEventDetail/${id}`);
  }
}

export default new EventsService();
