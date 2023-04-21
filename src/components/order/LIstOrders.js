import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Spinner from "react-bootstrap/Spinner";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { myOrders, clearErrors } from "../../actions/orderActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col } from "react-bootstrap";

const LIstOrders = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No. of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link
            to={`/order/${order._id}`}
            className="btn btn-primary py-1 px-2"
          >
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Orders"} />
      <Container>
        <Row>
          <Col xs={12} md={8} className="mx-auto">
            <h1 className="text-center my-5">My Orders</h1>

            {loading ? (
              <div className="text-center">
                <Spinner
                  className="loader"
                  animation="border"
                  variant="warning"
                ></Spinner>
              </div>
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LIstOrders;
