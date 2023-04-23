import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Spinner from "react-bootstrap/Spinner";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../actions/productActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button } from "react-bootstrap";

import Sidebar from "./Sidebar";

import { DELETE_PRODUCT_RESET } from "../../actions/types";

const ProductsList = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product deleted successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>{" "}
            /
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <Container fluid>
        <Row>
          <Col className=" p-0" md={2}>
            <Sidebar />
          </Col>

          <Col>
            <h1 className="my-5 text-center">All Products</h1>
            {loading ? (
              <Spinner
                className="loader"
                animation="border"
                variant="warning"
              ></Spinner>
            ) : (
              <MDBDataTable
                data={setProducts()}
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

export default ProductsList;
