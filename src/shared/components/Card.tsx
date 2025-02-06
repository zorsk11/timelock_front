import { Box, Text } from "@chakra-ui/react";

const Card = ({ title, content }: { title: string, content: string }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold">{title}</Text>
      <Text>{content}</Text>
    </Box>
  );
};

export default Card;