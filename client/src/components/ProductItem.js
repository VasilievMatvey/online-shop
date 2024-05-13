import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
const ProductItem = ({ data }) => {
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
      </Box>
    </Box>
  );
};

export default ProductItem;
