import React, { useState, useEffect } from "react";
import { Card, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  Stack,
  Box,
  Badge,
  Image,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import {
  fetchOneProduct,
  fetchProdRating,
  fetchAllReviews,
} from "../http/catalogAPI.js";
const ProductItem = ({ data }) => {
  const [rating, setRating] = useState(null);
  useEffect(() => {
    fetchProdRating(data.id).then((data) => setRating(data));
  }, [data.id]);
  console.log(rating);
  const navigate = useNavigate();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      maxW={"330px"}
      w={"full"}
      cursor={"pointer"}
      _hover={{ shadow: "xl" }}
      onClick={() => navigate(`/product/${data.id}`)}
    >
      <Image
        justifyContent={"center"}
        height={"250px"}
        width={"100%"}
        src={process.env.REACT_APP_IMG_URL + data.image}
        alt={data.name}
      />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Категория: {data.category.name} &bull; Бренд: {data.brand.name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.name}
        </Box>

        <Box>
          Цена:
          {data.price}
          руб.
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          {rating ? (
            Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < rating.rating ? "teal.500" : "gray.300"}
                />
              ))
          ) : (
            <Spinner animation="border" />
          )}
          {rating ? (
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              Отзывов: {rating.votes}
            </Box>
          ) : (
            <Spinner animation="border" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
