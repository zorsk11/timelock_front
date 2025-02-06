import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface PopularCardProps {
  imageUrl: string;
  name: string;
  value: number | string;
}

const PopularCard: React.FC<PopularCardProps> = ({ imageUrl, name, value }) => {
  return (
    <Flex justify="space-between" flexDir="column" align="center">
      <Box
        width="52px"
        height="52px"
        borderRadius="50%"
        overflow="hidden"
        bg="fillSecondaryLight"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb="12px"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        ) : (
          <Text>{name.charAt(0)}</Text>
        )}
      </Box>
      <Box textAlign="center">
        <Text textStyle="headline" fontWeight="600" textColor="black" mb="8px">
          {name}
        </Text>
        <Flex
          borderRadius="8px"
          bg="fillSecondaryLight"
          px="2"
          py="1"
          align="center"
        >
          <Text textStyle="subheadline" textColor="grey5Light">
            В наличии:
          </Text>
          <Text textStyle="subheadline" ml="2">
            {value}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PopularCard;
