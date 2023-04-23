import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { newProduct, clearErrors } from "../../actions/productActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import Sidebar from "./Sidebar";

import { NEW_PRODUCT_RESET } from "../../actions/types";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      alert.success("Product created successfully");

      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Container fluid>
      <MetaData title={"New Product"} />
      <Row>
        <Col className=" p-0 mr-0" md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <div className="wrapper my-5">
            <Form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="text-center mb-4">New Product</h1>

              <Form.Group className="form-group" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="form-group"
                controlId="formBasicDescription"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicSeller">
                <Form.Label>Seller</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter seller"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicImages">
                <Form.Label>Images</Form.Label>

                <Form.Control
                  id="custom-file"
                  type="file"
                  label="Choose Images"
                  multiple
                  custom
                  onChange={onChange}
                />
              </Form.Group>

              <Row>
                {imagesPreview.map((image) => (
                  <Col md={3} key={image}>
                    <Image
                      src={image}
                      alt="Images Preview"
                      width="55"
                      height="52"
                      className="mt-3 mr-3"
                      fluid
                      rounded
                    />
                  </Col>
                ))}
              </Row>

              <Button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Create
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProduct;
