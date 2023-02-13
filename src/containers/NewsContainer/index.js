import * as React from "react";
import { connect } from "react-redux";

import News from "../../components/news";
import {
  fetchNews,
  AddNews,
  EditNews,
  DeleteNews,
  NewsSlectedPage,
} from "./action";
class NewsContainer extends React.Component<Props, State> {
  render() {
    return (
      <News
        fetchNews={this.props.fetchNews}
        addNews={this.props.addNews}
        NewsList={this.props.NewsList}
        EditNews={this.props.EditNews}
        deleteNews={this.props.deleteNews}
      />
    );
  }
}
function bindAction(dispatch) {
  return {
    fetchNews: () => {
      dispatch(fetchNews());
    },
    addNews: (news, name) => {
      dispatch(AddNews(news, name));
    },
    EditNews: (news, name) => {
      dispatch(EditNews(news, name));
    },
    deleteNews: (id) => {
      dispatch(DeleteNews(id));
    },
  };
}

const mapStateToProps = (state) => {
  return {
    NewsList: state.NewsReducer.NewsList,
  };
};

export default connect(mapStateToProps, bindAction)(NewsContainer);
