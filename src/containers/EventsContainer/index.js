import * as React from "react";
import { connect } from "react-redux";

import Events from "../../components/events";
import { fetchEvents, AddEvents, EditEvents, DeleteEvents } from "./action";
class EventsContainer extends React.Component<Props, State> {
  render() {
    return (
      <Events
        fetchEvents={this.props.fetchEvents}
        addEvents={this.props.addEvents}
        EventsList={this.props.EventsList}
        EditEvents={this.props.EditEvents}
        deleteEvents={this.props.deleteEvents}
      />
    );
  }
}
function bindAction(dispatch) {
  return {
    fetchEvents: () => {
      dispatch(fetchEvents());
    },
    addEvents: (events, name) => {
      dispatch(AddEvents(events, name));
    },
    EditEvents: (events, name) => {
      dispatch(EditEvents(events, name));
    },
    deleteEvents: (id) => {
      dispatch(DeleteEvents(id));
    },
  };
}

const mapStateToProps = (state) => {
  return {
    EventsList: state.EventsReducer.EventsList,
  };
};

export default connect(mapStateToProps, bindAction)(EventsContainer);
