import React from "react";
import { Table, Modal, Image } from "react-bootstrap";
import "../../Common/cmnStyle.css";

function ViewEvents(props) {
  const data =
    props.ItemList && props.ItemList.item
      ? props.ItemList && props.ItemList.item
      : null;
  return (
    <div>
      <div>
        <Modal
          show={props.showViewModel}
          onHide={props.closeViewModel}
          animation={false}
          size="lg"
          className="detail-ad-Modal"
          backdrop="static"
        >
          <Modal.Header className="mastr-mdl-hd" closeButton>
            <Modal.Title>
              <span className="modl-titl-align">Events Details</span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <div className="viewModalTbl">
                <Table responsive bordered>
                  <tbody>
                    <tr>
                      <td className="viewModalTdWdth">Title</td>
                      <td className="viewModalCap">
                        {data !== null && data.title}
                      </td>
                    </tr>
                    <tr>
                      <td>Publish</td>
                      <td className="viewModalCap">
                        {data !== null && data.publish}
                      </td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td className="viewModalCap">
                        {data !== null && data.location}
                      </td>
                    </tr>
                    <tr>
                      <td>Short Descripton</td>
                      <td className="viewModalCap">
                        {data !== null && data.short_descripton}
                      </td>
                    </tr>
                    <tr>
                      <td>Full Descripton</td>
                      <td className="">
                        {data !== null && data.full_descripton}
                      </td>
                    </tr>
                    <tr>
                      <td>Featured Image</td>
                      <td className="viewModalCap">
                        <Image
                          className="img-thumb"
                          src={
                            data !== null &&
                            "https://tsd.shtdevops.xyz/events/" +
                              data.featured_image
                          }
                          thumbnail
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Events Images</td>
                      <td className="viewModalCap">
                        {data !== null &&
                          data.events_image.map((image, index) => {
                            return (
                              <div key={image} className="image">
                                <img
                                  src={
                                    "https://tsd.shtdevops.xyz/events/" + image
                                  }
                                  height="70"
                                  alt=""
                                />
                              </div>
                            );
                          })}
                      </td>
                    </tr>
                    <tr>
                      <td>Created Date</td>
                      <td className="viewModalCap">
                        {data !== null && data.date_added}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mastr-mdl-ftr"></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ViewEvents;
