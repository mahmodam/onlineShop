import React from "react";

import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button, Image } from "react-bootstrap";

import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 20;

  const taxPrice = Number((0.17 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <MetaData title={"Confirm Order"} />

      <Container>
        <Row>
          <Col xs={12} md={8} className="mx-auto">
            <CheckoutSteps shipping confirmOrder />
          </Col>
        </Row>

        <Row className="row d-flex justify-content-between">
          <Col className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <>
                <hr />
                <div className="cart-item my-1" key={item.product}>
                  <Row className="row">
                    <Col className="col-4 col-lg-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </Col>

                    <Col className="col-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x ${item.price} =
                        <b>${(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </Col>
                  </Row>
                </div>
                <hr />
              </>
            ))}
          </Col>

          <Col className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">${itemsPrice}</span>
              </p>
              <p>
                Shipping:
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <Button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ConfirmOrder;
