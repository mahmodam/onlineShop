import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";

import MetaData from "../layout/MetaData";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

import Sidebar from "./Sidebar";

import { DELETE_REVIEW_RESET } from "../../actions/types";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");

      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, navigate, productId, isDeleted]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <>
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteReviewHandler(review._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Product Reviews"} />
      <Container fluid>
        <Row className="row">
          <Col className=" p-0" md={2}>
            <Sidebar />
          </Col>

          <Col className="col-12 col-md-10">
            <h1 className="my-5 text-center">Product Reviews</h1>
            <>
              <Row className="row justify-content-center mt-5">
                <Col className="col-5">
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="form-group" controlId="productId">
                      <Form.Label>Enter Product ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="productId"
                        className="form-control"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      id="search_button"
                      type="submit"
                      className="btn btn-primary btn-block py-2"
                    >
                      SEARCH
                    </Button>
                  </Form>
                </Col>
              </Row>

              {reviews && reviews.length > 0 ? (
                <MDBDataTable
                  data={setReviews()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              ) : (
                <p className="mt-5 text-center">No Reviews.</p>
              )}
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductReviews;
