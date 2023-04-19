import React, { Fragment } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeCartItem } from "../../actions/cartActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Image, Button } from "react-bootstrap";

const Cart = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));

    alert.success("Item removed from cart");
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title={"Your Cart"} />
      <Container>
        {cartItems.length === 0 ? (
          <h2 className="mt-5">
            Your Cart is Empty{" "}
            <Link style={{ textDecoration: "none" }} to="/">
              Go Back
            </Link>
          </h2>
        ) : (
          <>
            <h2 className="mt-5">
              Your Cart: <b>{cartItems.length} items</b>
            </h2>

            <Row className="row d-flex justify-content-between">
              <Col className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <Fragment key={item.product}>
                    <hr />

                    <div className="cart-item">
                      <Row className="row">
                        <Col className="col-4 col-lg-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            height="90"
                            width="115"
                          />
                        </Col>

                        <Col className="col-5 col-lg-3">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </Col>

                        <Col className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() =>
                                decreaseQty(item.product, item.quantity)
                              }
                            >
                              -
                            </span>

                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </Col>

                        <Col className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger mt-2"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
                        </Col>
                      </Row>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </Col>

              <Col className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>

                  <hr />
                  <Button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
