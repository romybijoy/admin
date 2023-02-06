

import React from "react"
import { Row, Col, Modal, Button } from "react-bootstrap";
import EventsService from "../../api/EventsService";
import "../../Common/cmnStyle.css";


function DeleteModal(props) {
  function Submit() {
    EventsService.deleteEventsById( props.ItemList._id)
    
    props.closeDelModel();
  };

  return (
    <div>
      <Modal
        show={props.showDelModel}
        animation={false}
        size="md"
        backdrop="static"
        className="detailModal"
        onHide={props.closeDelModel}
      >
        <Modal.Header className="mastr-mdl-hd"

          closeButton
        >
          <Modal.Title>
            <span className="modl-titl-align">Delete Confirmation</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div>
            <h6 className="delete-msg">
              <b>Are you sure you want to delete?</b>
            </h6>
          </div>
          <Row className="delete-btn-rw">
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button
                className="cmnDelCnclBtn"
                variant="danger"
                onClick={() => props.closeDelModel()}
              >
                CANCEL
                    </Button>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button
                variant="success"
                className="cmnDelOkBtn"
                onClick={Submit}
              >
                OK
                    </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeleteModal;
