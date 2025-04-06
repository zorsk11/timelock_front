import React from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

export interface EmailCardProps {
  oldEmail: string;
  newEmail: string;
  onNewEmailChange: (value: string) => void;
  onSave: () => void;
}

const EmailCard: React.FC<EmailCardProps> = ({ oldEmail, newEmail, onNewEmailChange, onSave }) => {
  return (
    <Box p={6} borderRadius="12px" bg="white">
      <FormControl>
        <FormLabel fontWeight="bold" fontSize="lg" mb={4}>
          Изменение почты
        </FormLabel>

        <FormLabel htmlFor="oldEmail" color="gray.600">
          Старая почта
        </FormLabel>
        <Input
          id="oldEmail"
          value={oldEmail}
          isReadOnly
          size="lg"
          focusBorderColor="#C8D9F8"
          background="#F5F5F5"
          border="none"
          mb={4}
        />

        <FormLabel htmlFor="newEmail" color="gray.600">
          Новая почта
        </FormLabel>
        <Input
          id="newEmail"
          value={newEmail}
          onChange={(e) => onNewEmailChange(e.target.value)}
          placeholder="Введите новую почту"
          size="lg"
          focusBorderColor="#C8D9F8"
          background="#F5F5F5"
          border="none"
          mb={4}
        />

        <Button
          p="24px 32px"
          color="#FFFFFF"
          size="lg"
          width="100%"
          borderRadius="16px"
          backgroundColor="#4781E9"
          onClick={onSave}
        >
          Сохранить
        </Button>
      </FormControl>
    </Box>
  );
};

export default EmailCard;
