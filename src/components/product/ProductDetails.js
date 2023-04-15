import React, { useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

import Spinner from "react-bootstrap/Spinner";
import { Carousel } from "react-bootstrap";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";

const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  // const navigate = useNavigate();
  // const location = useLocation();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, error, id, alert]);

  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Spinner
          className="loader"
          animation="border"
          variant="warning"
        ></Spinner>
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <Image src={image.url} alt={product.name} fluid />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col md={6}>
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value="1"
                  readOnly
                />

                <span className="btn btn-primary plus">+</span>
              </div>
              <Button
                variant="primary"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </Button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>

              <p>{product.description}</p>
              <hr />

              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <Button
                id="review_btn"
                variant="primary"
                type="button"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </Button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <Button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </Button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <Button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mt-2">
                <h4>Reviews:</h4>
                <hr />
                <p>No Reviews</p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

/* //     <div class="container container-fluid">
    //     <div class="row f-flex justify-content-around">
    //         <div class="col-12 col-lg-5 img-fluid" id="product_image">
    //             <img src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt="sdf" height="500" width="500">
    //         </div>

    //         <div class="col-12 col-lg-5 mt-5">
    //             <h3>onn. 32” Class HD (720P) LED Roku Smart TV (100012589)</h3>
    //             <p id="product_id">Product # sklfjdk35fsdf5090</p>

    //             <hr>

    //             <div class="rating-outer">
    //                 <div class="rating-inner"></div>
    //             </div>
    //             <span id="no_of_reviews">(5 Reviews)</span>

    //             <hr>

    //             <p id="product_price">$108.00</p>
    //             <div class="stockCounter d-inline">
    //                 <span class="btn btn-danger minus">-</span>

    //                 <input type="number" class="form-control count d-inline" value="1" readOnly />

    //                 <span class="btn btn-primary plus">+</span>
    //             </div>
    //              <button type="button" id="cart_btn" class="btn btn-primary d-inline ml-4">Add to Cart</button>

    //             <hr>

    //             <p>Status: <span id="stock_status">In Stock</span></p>

    //             <hr>

    //             <h4 class="mt-2">Description:</h4>
    //             <p>Binge on movies and TV episodes, news, sports, music and more! We insisted on 720p High Definition for this 32" LED TV, bringing out more lifelike color, texture and detail. We also partnered with Roku to bring you the best possible content with thousands of channels to choose from, conveniently presented through your own custom home screen.</p>
    //             <hr>
    //             <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>

    //             <button id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
    //                         Submit Your Review
    //             </button>

    //             <div class="row mt-2 mb-5">
    //                 <div class="rating w-50">

    //                     <div class="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
    //                         <div class="modal-dialog" role="document">
    //                             <div class="modal-content">
    //                                 <div class="modal-header">
    //                                     <h5 class="modal-title" id="ratingModalLabel">Submit Review</h5>
    //                                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                                         <span aria-hidden="true">&times;</span>
    //                                     </button>
    //                                 </div>
    //                                 <div class="modal-body">

    //                                     <ul class="stars" >
    //                                         <li class"star"><i class="fa fa-star"></i></li>
    //                                         <li class="star"><i class="fa fa-star"></i></li>
    //                                         <li class="star"><i class="fa fa-star"></i></li>
    //                                         <li class="star"><i class="fa fa-star"></i></li>
    //                                         <li class="star"><i class="fa fa-star"></i></li>
    //                                     </ul>

    //                                     <textarea name="review" id="review" class="form-control mt-3">

    //                                     </textarea>

    //                                     <button class="btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" aria-label="Close">Submit</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                 </div>

    //         </div>

    //     </div>

    // </div> */

export default ProductDetails;
