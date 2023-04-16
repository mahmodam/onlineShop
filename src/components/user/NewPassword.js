import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

//import Spinner from "react-bootstrap/Spinner";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";

import { useNavigate, useParams } from "react-router-dom";

import { resetPassword, clearErrors } from "../../actions/userActions";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { token } = useParams();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, error, navigate, alert, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, formData));
  };
  return (
    <>
      <MetaData title={"New Password Reset"} />
      <Container>
        <Row className="row wrapper">
          <Col className="col-10 col-lg-5">
            <Form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">New Password</h1>
              <Form.Group className="form-group" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="form-group"
                controlId="formBasicConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-block py-3"
              >
                Set New Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewPassword;
