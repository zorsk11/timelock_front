import React from "react";
import { FC } from "react";
import { Box, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const RoomsPage: FC = () => {
  const [text, setText] = useState<string>("https://example.com");

  return (
    <VStack spacing={4} p={4} bg="gray.100" borderRadius="lg">
      <Box p={4} bg="white" borderRadius="lg">
        <QRCodeCanvas value={text} size={200} />
      </Box>
      <Input
        placeholder="Введите ссылку или текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
        bg="white"
      />
      <Button colorScheme="blue" onClick={() => setText(text)}>
        Сгенерировать QR-код
      </Button>
    </VStack>
  );
};


export default RoomsPage;
