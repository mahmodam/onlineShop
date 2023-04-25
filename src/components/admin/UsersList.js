import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Spinner from "react-bootstrap/Spinner";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button } from "react-bootstrap";

import Sidebar from "./Sidebar";

import { DELETE_USER_RESET } from "../../actions/types";

const UsersList = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User deleted successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isDeleted]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        actions: (
          <>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>{" "}
            /
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <Container fluid>
        <Row>
          <Col className=" p-0" md={2}>
            <Sidebar />
          </Col>

          <Col>
            <h1 className="my-5 text-center">All Users</h1>
            {loading ? (
              <Spinner
                className="loader"
                animation="border"
                variant="warning"
              ></Spinner>
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default UsersList;
