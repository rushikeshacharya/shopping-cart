import React, { useState, useEffect } from "react";
import Axios from "axios";
import CartItem from "./CardItem";
import { faker } from "@faker-js/faker";
import { Container, Col, Row } from "reactstrap";

const apiKey = "INSERT_YOUR_KEY";

const url = "http://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";
const localURL = "https://api.jsonbin.io/v3/qs/651d8bb112a5d376598728c9";
const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);
  // const fetchPhotos = async() => {
  //     const response = await Axios.length(url, {
  //         header: {
  //             Authorization: apiKey
  //         }
  //     })
  // }

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localURL);

    const { photos } = data.record;
    console.log("---->", photos);
    const allProduct = photos.map((photo) => ({
      small: photo.src.medium,
      tiny: photo.src.tiny,
      productName: faker.word.words(),
      productPrice: faker.finance.amount(),
      id: faker.string.uuid(),
    }));
    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
