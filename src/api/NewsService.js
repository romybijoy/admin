import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { appConfig } from "../config";

class NewsService {
  retriveAllNews() {
    return axios.post(`${appConfig.ip}/testGetNews`);
  }

  addNews(news, name) {
    console.log(news);

    const date = moment(new Date()).format("DD/MM/yyyy");

    const data = {
      title: news.title,
      description: news.description,
      date_added: date,
      search_tags: news.search_tags,
      featured_image: news.imgUrl.name,
      news_image: name,
    };
    console.log(data);
    axios
      .post(`${appConfig.ip}/testInsertNews`, data)
      .then((data) => {
        toast.success("News added successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("News addition failed", {
          autoClose: 2000,
        });
      });
  }

  editNews(news, name) {

    const data = {
      id: news.id,
      title: news.title,
      description: news.description,
      search_tags: news.search_tags,
      featured_image: news.imgUrl ? news.imgUrl.name : news.featured_image,
      news_image: name,
    };
    axios
      .post(`${appConfig.ip}/testUpdateEvent`, data)
      .then(() => {
        toast.success("News updated successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("News updation failed", {
          autoClose: 2000,
        });
      });
  }

  deleteNewsById(id) {
    axios
      .post(`${appConfig.ip}/testDeleteNews`, { del_id: id })
      .then((data) => {
        toast.success("Deleted successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  }

  getNewsByid(id) {
    console.log("service" + id);

    return axios.get(`${appConfig.ip}/testGetNewsDetail/${id}`);
  }
}

export default new NewsService();
