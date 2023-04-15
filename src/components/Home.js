import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";

import { useParams } from "react-router-dom";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 2000]);

  const [category, setCategory] = useState("");

  const [rating, setRating] = useState(0);

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

  const { keyword } = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, currentPage, keyword, price, category, rating, alert]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Spinner
          className="loader"
          animation="border"
          variant="warning"
        ></Spinner>
      ) : (
        <>
          <MetaData title={"Home"} />
          <Container>
            <Row>
              <Col>
                <h1 id="products_heading" className="text-center">
                  Latest Products
                </h1>
              </Col>
            </Row>

            <Row>
              {keyword ? (
                <>
                  <Col lg={3} md={6} sm={12} className="mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          2000: `$2000`,
                        }}
                        min={1}
                        max={2000}
                        defaultValue={[1, 2000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>

                        <hr className="my-3" />

                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className="btn btn-block btn-danger mt-5"
                          onClick={() => setCategory("")}
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  </Col>

                  {products.map((product) => (
                    <Col key={product._id} lg={3} md={6} sm={12}>
                      <Product product={product} />
                    </Col>
                  ))}
                </>
              ) : (
                products.map((product) => (
                  <Col key={product._id} lg={3} md={6} sm={12}>
                    <Product product={product} />
                  </Col>
                ))
              )}
            </Row>
          </Container>

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
