import { Container, Row, Col, Image, Spinner, Table } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { SimpleGrid, Button } from "@chakra-ui/react";
import ReviewCard from "../components/ReviewCard";
import AddReviewModal from "../components/AddReviewModal";
// import { fetchAllReviews, createReview } from "../http/reviewAPI.js";
import {
  fetchOneProduct,
  fetchProdRating,
  fetchAllReviews,
  createReview,
} from "../http/catalogAPI.js";
import { useParams } from "react-router-dom";
import { append } from "../http/basketAPI.js";
import { AppContext } from "../components/AppContext.js";

const Product = () => {
  const { id } = useParams();
  const { user, basket } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReview = (reviewData) => {
    try {
      createReview(id, { ...reviewData, userId: user.id });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    fetchProdRating(id).then((data) => setRating(data));
    fetchAllReviews(id).then((data) => {
      setReviews(data);
    });
  }, [id]);

  const handleClick = (productId) => {
    append(productId).then((data) => {
      basket.products = data.products;
    });
  };

  if (!product) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col lg={4}>
          {product.image ? (
            <Image
              width={300}
              height={300}
              src={process.env.REACT_APP_IMG_URL + product.image}
            />
          ) : (
            <Image
              width={300}
              height={300}
              src="http://via.placeholder.com/300"
            />
          )}
        </Col>
        <Col lg={8}>
          <h1>{product.name}</h1>
          <h3>{product.price}.00 руб.</h3>
          <p>Бренд: {product.brand.name}</p>
          <p>Категория: {product.category.name}</p>
          <div>
            {rating ? (
              <p>
                Рейтинг: {rating.rating}, голосов {rating.votes}
              </p>
            ) : (
              <Spinner animation="border" />
            )}
          </div>
          {user.isAuth ? (
            <Button colorScheme="teal" onClick={() => handleClick(product.id)}>
              Добавить в корзину
            </Button>
          ) : (
            ""
          )}
        </Col>
      </Row>
      {!!product.props.length && (
        <Row>
          <Col>
            <h3>Характеристики</h3>
            <Table bordered hover size="sm">
              <tbody>
                {product.props.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      <h3>Отзывы:</h3>

      {user.isAuth ? (
        <>
          <Button colorScheme="teal" onClick={handleModalOpen}>
            Добавить отзыв
          </Button>{" "}
          <AddReviewModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleSubmitReview}
          />
        </>
      ) : (
        ""
      )}
      {reviews ? (
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={"20"}
          mt={16}
          mb={16}
          mx={"auto"}
        >
          {reviews.map((review) => (
            <ReviewCard data={review} key={review.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Spinner animation="border" />
      )}
    </Container>
  );
};

export default Product;
