import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

import Spinner from "react-bootstrap/Spinner";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";

import { Link, useNavigate } from "react-router-dom";

import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(login(email, password));
  };

  return (
    <Container className="container container-fluid">
      <Row className="row wrapper">
        <Col className="col-10 col-lg-5">
          <MetaData title={"Login"} />
          <h1 className="text-center">Login</h1>

          {loading ? (
            <Spinner
              className="loader"
              animation="border"
              variant="warning"
            ></Spinner>
          ) : (
            <Form className="shadow-lg" onSubmit={submitHandler}>
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

              <Link to="/password/forgot" className="float-right mb-4">
                Forgot Password?
              </Link>

              <Button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
              >
                LOGIN
              </Button>

              <Link to="/register" className="float-right mt-3">
                New User?
              </Link>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

//
//   /* <div class="container container-fluid">
//         <div class="row wrapper">
// 		<div class="col-10 col-lg-5">
//         <form class="shadow-lg">
//             <h1 class="mb-3">Login</h1>
//             <div class="form-group">
//               <label for="email_field">Email</label>
//               <input
//                 type="email"
//                 id="email_field"
//                 class="form-control"
//                 value=""
//               />
//             </div>

//             <div class="form-group">
//               <label for="password_field">Password</label>
//               <input
//                 type="password"
//                 id="password_field"
//                 class="form-control"
//                 value=""
//               />
//             </div>

//             <a href="#" class="float-right mb-4">Forgot Password?</a>

//             <button
//               id="login_button"
//               type="submit"
//               class="btn btn-block py-3"
//             >
//               LOGIN
//             </button>

//             <a href="#" class="float-right mt-3">New User?</a>
//           </form>
// 		  </div>
//     </div>
// </div> */
//
