import React from "react";
//import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    // <Card style={{ width: "17rem" }} className="p-3">
    //   <Card.Img className="card-img-top mx-auto" src={product.images[0].url} />
    //   <Card.Body className="card-body d-flex flex-column">
    //     <Card.Title className="card-title">{product.name}</Card.Title>
    //     <Card.Text className="card-text">
    //       <div className="ratings mt-auto">
    //         <div className="rating-outer">
    //           <div
    //             className="rating-inner"
    //             style={{ width: `${(product.ratings / 5) * 100}%` }}
    //           ></div>
    //         </div>
    //         <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
    //       </div>
    //     </Card.Text>
    //     <Card.Text className="card-text">$ {product.price}</Card.Text>
    //     <Link to={`/product/${product._id}`}>
    //       <Button variant="primary" id="view_btn" className="btn btn-block ">
    //         View Details
    //       </Button>
    //     </Link>
    //   </Card.Body>
    // </Card>

    <div className="card p-3 rounded">
      <img
        className="card-img-top mx-auto"
        src={product.images[0].url}
        alt=""
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
        </div>
        <p className="card-text">${product.price}</p>
        <Link
          to={`/product/${product._id}`}
          id="view_btn"
          className="btn btn-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
