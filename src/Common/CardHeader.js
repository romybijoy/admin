import React from "react";
import { Row, Col } from "react-bootstrap";
import "../Common/cmnStyle.css";
import { FaSearch } from "react-icons/fa";

function CardHeader(props) {
  const { title, searchHandler, placeholder, value, hasSearch = false } = props;

  return (
    <Row>
      <Col xs={12} sm={6} md={6} lg={3} style={{ marginLeft: "5px" }}>
        <h3 className="cmnHdName"> {title}</h3>
      </Col>
      <Col xs={12} sm={6} md={6} lg={4} style={{ margin: "auto" }}>
        {hasSearch && (
          <div className="commonInput">
            <i  className="cmnSearchIcon"><FaSearch /></i>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => searchHandler(e)}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default CardHeader;
