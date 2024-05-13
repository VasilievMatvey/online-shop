import { Box, List, ListItem, useColorMode, Text } from "@chakra-ui/react";

import { useContext } from "react";
import { AppContext } from "./AppContext.js";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";

const CategoryBar = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const handleClick = (id) => {
    if (id === catalog.category) {
      catalog.category = null;
    } else {
      catalog.category = id;
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
    <Box
      as="listGroup"
      color={colorMode === "dark" ? "white" : "black"}
      p="12px 16px 0px 0px"
      display="flex"
      flex={"column"}
      width="100%"
    >
      <List spacing={2} style={{ cursor: "pointer" }}>
        <Text fontSize="lg" fontWeight="bold">
          Категории:
        </Text>
        {catalog.categories.map((item) => (
          <ListItem
            key={item.id}
            fontSize="lg"
            pr={5}
            pl={5}
            borderRadius={"lg"}
            bgColor={item.id === catalog.category ? "teal.300" : "normal"}
            fontWeight={item.id === catalog.category ? "bold" : "normal"}
            onClick={() => handleClick(item.id)}
          >
            {item.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default CategoryBar;
