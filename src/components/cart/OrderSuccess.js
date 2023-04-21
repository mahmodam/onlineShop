import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <>
      <MetaData title={"Order Success"} />
      <Container>
        <Row className="row justify-content-center">
          <Col className="col-6 mt-5 text-center">
            <Image
              className="my-5 img-fluid d-block mx-auto"
              src="/images/order_success.png"
              alt="Order Success"
              width="200"
              height="200"
            />

            <h2>Your Order has been placed successfully.</h2>

            <Link to="/orders/me">Go to Orders</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderSuccess;
