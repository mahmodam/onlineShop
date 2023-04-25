import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Spinner from "react-bootstrap/Spinner";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button } from "react-bootstrap";

import Sidebar from "./Sidebar";

import { DELETE_ORDER_RESET } from "../../actions/types";

const OrdersList = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, navigate, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

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
          <>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>{" "}
            /
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <Container fluid>
        <Row>
          <Col className=" p-0" md={2}>
            <Sidebar />
          </Col>

          <Col>
            <h1 className="my-5 text-center">All Orders</h1>
            {loading ? (
              <Spinner
                className="loader"
                animation="border"
                variant="warning"
              ></Spinner>
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

export default OrdersList;
