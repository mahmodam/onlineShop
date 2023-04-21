import React, { Fragment, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

import CheckoutSteps from "./CheckoutSteps";

import { createOrder, clearErrors } from "../../actions/orderActions";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const alert = useAlert();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title={"Payment"} />

      <Container>
        <Row className="row wrapper mt-0">
          <Col className="col-10 col-lg-5">
            <CheckoutSteps shipping confirmOrder payment />
          </Col>
        </Row>

        <Row className="row wrapper">
          <Col className="col-10 col-lg-5">
            <Form className="shadow-lg" onSubmit={handleSubmit}>
              <h2 className="mb-4">Card Info</h2>

              <Form.Group controlId="card_num">
                <Form.Label>Card Number</Form.Label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control"
                  options={options}
                />
              </Form.Group>

              <Form.Group controlId="card_exp">
                <Form.Label>Card Expiry</Form.Label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control"
                  options={options}
                />
              </Form.Group>

              <Form.Group controlId="card_cvc">
                <Form.Label>Card CVC</Form.Label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control"
                  options={options}
                />
              </Form.Group>

              <Button id="pay_btn" type="submit" className="btn btn-block py-3">
                Pay {` - ${orderInfo && orderInfo.totalPrice}`}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
