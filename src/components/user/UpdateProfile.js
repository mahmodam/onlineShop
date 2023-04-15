import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

//import Spinner from "react-bootstrap/Spinner";
import MetaData from "../layout/MetaData";

import { UPDATE_PROFILE_RESET } from "../../actions/types";

import { useAlert } from "react-alert";

import { useNavigate } from "react-router-dom";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { user } = useSelector((state) => state.auth);

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());
      navigate("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, alert, isUpdated, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);

    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };
  return (
    <>
      <MetaData title={"Update Profile"} />
      <Container className="container container-fluid">
        <Row className="row wrapper">
          <Col className="col-10 col-lg-5">
            <Form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mt-2 mb-5">Update Profile</h1>
              <Form.Group className="form-group" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="form-control"
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="form-control"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateProfile;
