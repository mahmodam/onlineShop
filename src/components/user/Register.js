import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import Spinner from "react-bootstrap/Spinner";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";

import { useNavigate } from "react-router-dom";

import { register, clearErrors } from "../../actions/userActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, alert]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  return (
    <Container className="container container-fluid">
      <Row className="row wrapper">
        <Col className="col-10 col-lg-5">
          <MetaData title={"Register"} />
          <h1 className="text-center">Register</h1>

          {loading ? (
            <Spinner
              className="loader"
              animation="border"
              variant="warning"
            ></Spinner>
          ) : (
            <Form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <Form.Group className="form-group" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="form-control"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group " controlId="formBasicAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  className="form-control py-1 pl-1"
                  type="file"
                  name="avatar"
                  accept="images/*"
                  onChange={(e) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                      // readyState means the state of the file
                      // readyState === 2 means that the file has been loaded
                      // readyState === 1 means that the file is loading
                      // readyState === 0 means that the file has not been loaded
                      if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                      }
                    };

                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicAvatar">
                <Form.Label>Avatar Preview</Form.Label>
                <figure className="avatar mr-3 item-rtl">
                  <Image
                    className="rounded-circle"
                    src={avatarPreview}
                    alt="Avatar Preview"
                    fluid
                  />
                </figure>
              </Form.Group>

              <Button
                className="btn btn-block py-3"
                disabled={loading ? true : false}
                type="submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

/* <div class="container container-fluid">
        <div class="row wrapper">
		<div class="col-10 col-lg-5">
        <form class="shadow-lg" encType='multipart/form-data'>
            <h1 class="mb-3">Register</h1>

          <div class="form-group">
            <label for="email_field">Name</label>
            <input type="name" id="name_field" class="form-control" value="" />
          </div>

            <div class="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                class="form-control"
                value=""
              />
            </div>
  
            <div class="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                value=""
              />
            </div>

            <div class='form-group'>
              <label for='avatar_upload'>Avatar</label>
              <div class='d-flex align-items-center'>
                  <div>
                      <figure class='avatar mr-3 item-rtl'>
                          <img
                              src=""
                              class='rounded-circle'
                              alt='image'
                          />
                      </figure>
                  </div>
                  <div class='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          class='custom-file-input'
                          id='customFile'
                      />
                      <label class='custom-file-label' for='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              class="btn btn-block py-3"
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
</div> */
