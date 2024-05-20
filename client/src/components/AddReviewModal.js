import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Textarea,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <StarIcon
          key={star}
          color={star <= rating ? "teal.400" : "gray.200"}
          boxSize={6}
          cursor="pointer"
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [reviewData, setReviewData] = useState({
    title: "",
    userName: "",
    rating: 0,
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewData((prevState) => ({
      ...prevState,
      rating: rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправка данных на сервер
    onSubmit(reviewData);
    // Закрыть модальное окно
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить отзыв</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="userName" isRequired>
              <FormLabel>Введите ваше имя</FormLabel>
              <Input
                type="text"
                name="userName"
                value={reviewData.userName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="title" isRequired>
              <FormLabel>Заголовок</FormLabel>
              <Input
                type="text"
                name="title"
                value={reviewData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="rating" isRequired>
              <FormLabel>Оценка</FormLabel>
              <StarRating
                rating={reviewData.rating}
                onRatingChange={handleRatingChange}
              />
            </FormControl>
            <FormControl id="text" isRequired>
              <FormLabel>Текст отзыва</FormLabel>
              <Textarea
                name="text"
                value={reviewData.text}
                onChange={handleChange}
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Добавить отзыв
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Закрыть</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddReviewModal;
