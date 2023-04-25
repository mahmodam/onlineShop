import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

//import Spinner from "react-bootstrap/Spinner";
import MetaData from "../layout/MetaData";

import { UPDATE_USER_RESET } from "../../actions/types";

import { useAlert } from "react-alert";

import { useNavigate, useParams } from "react-router-dom";

import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";

import Sidebar from "./Sidebar";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, isUpdated } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.userDetails);

  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      navigate("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, alert, isUpdated, user, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);

    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };
  return (
    <>
      <MetaData title={`Update User`} />
      <Container fluid>
        <Row className="row">
          <Col className="col-12 col-md-2">
            <Sidebar />
          </Col>

          <Col className="col-12 col-md-10">
            <Row className="row wrapper">
              <Col className="col-10 col-lg-5">
                <Form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mt-2 mb-5">Update User</h1>

                  <Form.Group controlId="name_field">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="email_field">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="role_field">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                  >
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateUser;
