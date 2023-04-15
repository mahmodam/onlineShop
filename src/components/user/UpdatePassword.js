import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

//import Spinner from "react-bootstrap/Spinner";
import MetaData from "../layout/MetaData";

import { UPDATE_PASSWORD_RESET } from "../../actions/types";

import { useAlert } from "react-alert";

import { useNavigate } from "react-router-dom";

import { updatePassword, clearErrors } from "../../actions/userActions";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, alert, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("Password", Password);
    dispatch(updatePassword(formData));
  };
  return (
    <>
      <MetaData title={"Update Password"} />
      <Container>
        <Row className="row wrapper">
          <Col className="col-10 col-lg-5">
            <Form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mt-2 mb-5">Update Password</h1>
              <Form.Group className="form-group" controlId="oldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                />
              </Form.Group>
              <Form.Group className="form-group" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </Form.Group>
              <Button
                className="btn btn-block py-3"
                disabled={loading ? true : false}
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdatePassword;
