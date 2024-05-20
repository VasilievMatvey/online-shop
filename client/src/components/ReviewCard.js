import React from "react";
import { chakra, Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
const ReviewCard = ({ data }) => {
  return (
    <Flex
      boxShadow={"lg"}
      maxW={"640px"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <Heading as={"h3"} fontSize={"xl"}>
          {data.title || "Review header"}
        </Heading>
        <chakra.p
          fontFamily={"Inter"}
          fontWeight={"medium"}
          fontSize={"15px"}
          pb={4}
        >
          {data.text}
        </chakra.p>
        <chakra.p
          fontFamily={"Inter"}
          fontWeight={"medium"}
          fontSize={"15px"}
          pb={4}
        >
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < data.rating ? "teal.500" : "gray.300"}
              />
            ))}
        </chakra.p>
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          {data.userName} - {data.prettyCreatedAt}
        </chakra.p>
      </Flex>
    </Flex>
  );
};

export default ReviewCard;
