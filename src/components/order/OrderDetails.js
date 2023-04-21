import React, { Fragment, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Image } from "react-bootstrap";

const OrderDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <>
      <MetaData title={"Order Details"} />

      {loading ? (
        <div className="text-center">
          <Spinner
            className="loader"
            animation="border"
            variant="warning"
          ></Spinner>
        </div>
      ) : (
        <Fragment>
          <Container>
            <Row>
              <Col xs={12} md={8} className="mx-auto">
                <h1 className="my-5">Order # {order._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user && user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {shippingDetails}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>

                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                  {orderItems &&
                    orderItems.map((item) => (
                      <Row key={item.product} className="row my-5">
                        <Col className="col-4 col-lg-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </Col>

                        <Col className="col-5 col-lg-5">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </Col>

                        <Col className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </Col>
                      </Row>
                    ))}
                </div>
                <hr />
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </>
  );
};

export default OrderDetails;
