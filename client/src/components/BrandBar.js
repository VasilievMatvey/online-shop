import { ListGroup } from "react-bootstrap";
import {
  HStack,
  Box,
  List,
  ListItem,
  Flex,
  Text,
  Tag,
  Center,
} from "@chakra-ui/react";

import { useContext } from "react";
import { AppContext } from "./AppContext.js";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";

const BrandBar = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === catalog.brand) {
      catalog.brand = null;
    } else {
      catalog.brand = id;
    }
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: "/catalog",
      search: "?" + createSearchParams(params),
    });
  };

  return (
    <HStack>
      <Center fontSize="m" fontWeight="bold">
        Бренды:
      </Center>
      {catalog.brands.map((item) => (
        <Tag
          cursor={"pointer"}
          key={item.id}
          fontSize="lg"
          pr={5}
          pl={5}
          borderRadius={"lg"}
          bgColor={item.id === catalog.brand ? "teal.300" : "normal"}
          fontWeight={item.id === catalog.brand ? "bold" : "normal"}
          onClick={() => handleClick(item.id)}
        >
          {item.name}
        </Tag>
      ))}
    </HStack>
  );
});

export default BrandBar;
