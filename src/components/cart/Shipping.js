import React, { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { saveShippingInfo } from "../../actions/cartActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

import { countries } from "countries-list";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const countriesList = Object.values(countries);

  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));

    alert.success("Shipping info saved successfully");

    navigate("/confirm");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />

      <Container>
        <Row className="row wrapper mt-0">
          <Col className="col-10 col-lg-5">
            <CheckoutSteps shipping />
          </Col>
        </Row>

        <Row className="row wrapper">
          <Col className="col-10 col-lg-5">
            <Form className="shadow-lg" onSubmit={submitHandler}>
              <h2 className="text-center mb-4">Shipping Info</h2>

              <Form.Group className="form-group" controlId="formGroupAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group" controlId="formGroupCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group" controlId="formGroupPhoneNo">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  className="form-control"
                  type="phone"
                  placeholder="Enter Phone No"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group
                className="form-group"
                controlId="formGroupPostalCode"
              >
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formGroupCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="form-control"
                  as="select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countriesList.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                id="shipping_btn"
                type="submit"
                className="btn btn-block py-3"
              >
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shipping;
