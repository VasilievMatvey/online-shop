import React from "react";

import {
  SimpleGrid,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";

const CardList = (props) => {
  const { cards = [] } = props;
  return (
    <SimpleGrid columns={[1, null, 2, 4]} spacing={[2, null, 4, 6]}>
      {cards.map((card) => (
        <Stack
          maxW="xl"
          key={card.id}
          spacing={1}
          _hover={{ shadow: "xl" }}
          p={2}
        >
          <Image boxSize="300px" src={card.image} alt={card.title} />

          <Heading as="h4">{card.title}</Heading>
          <Text>{card.text}</Text>
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default CardList;
