import React, { useEffect, useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Box, Flex, Container, Heading, Text, Divider } from "@chakra-ui/react";

import support from "../assets/sup.jpg";
import delivery from "../assets/delivery.jpg";
import items from "../assets/items.jpg";
import price from "../assets/price.jpg";
import CardList from "../components/CardList";
import CustomCarousel from "../components/CustomCarousel";
import { AppContext } from "../components/AppContext.js";
import { fetchLastProducts } from "../http/catalogAPI.js";
// import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { catalog } = useContext(AppContext);
  const [productsFetching, setProductsFetching] = useState(true);

  useEffect(() => {
    fetchLastProducts()
      .then((data) => {
        catalog.products = data;
      })
      .finally(() => setProductsFetching(false));
  }, []);

  const info = [
    {
      id: 1,
      title: "Широкий ассортимент товаров:",
      image: items,
      text: "Мы предлагаем большой выбор товаров для всех категорий покупателей.",
    },
    {
      id: 2,

      title: "Быстрая доставка:",
      image: delivery,
      text: "Мы гарантируем быструю и надежную доставку всех заказов по всей стране.",
    },
    {
      id: 3,
      image: price,
      title: "Доступная цена:",
      text: "Мы гарантируем доступную цену на все товары нашего магазина.",
    },
    {
      id: 4,
      image: support,
      title: "Отличное обслуживание клиентов:",
      text: `Наша служба поддержки всегда готова помочь вам с любыми
                вопросами и проблемами.`,
    },
  ];
  return (
    <Container maxW="container.xl" className="main">
      <Heading size="lg" className="text-center" mt={2}>
        Добро пожаловать в наш интернет магазин!
      </Heading>
      <Text fontSize="lg">
        Добро пожаловать в наш интернет-магазин электроники! Здесь вы найдете
        широкий ассортимент современных гаджетов, устройств и аксессуаров, чтобы
        всегда быть в тренде технологий. Мы предлагаем лучшие бренды по выгодным
        ценам, чтобы каждый мог найти то, что идеально подходит именно ему. Наша
        команда экспертов по электронике всегда готова помочь вам с выбором,
        подобрать оптимальное решение и ответить на все ваши вопросы. Быстрая
        доставка, качественный сервис и удобный процесс покупок делают ваше
        шопинг-путешествие с нами приятным и удобным. Здесь вы сможете найти
        все, что нужно для комфортной и современной жизни в цифровой эпохе.
        Добро пожаловать в мир инноваций и высоких технологий!
      </Text>
      <Divider />
      <Heading className="text-center" size="l">
        Наши преимущества:
      </Heading>
      <CardList cards={info} />

      <Heading className="text-center" size="l" mt={2} mb={3}>
        Наши последние товары:
      </Heading>
      <Box>
        <Flex justifyContent={"center"} alignItems={"center"}>
          {productsFetching ? (
            <Spinner animation="border" />
          ) : (
            <Box borderWidth="1px" borderRadius="lg">
              <CustomCarousel products={catalog.products} />
            </Box>
          )}
        </Flex>
      </Box>
    </Container>
  );
};

export default MainPage;
