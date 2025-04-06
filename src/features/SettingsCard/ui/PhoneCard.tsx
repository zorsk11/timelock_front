import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

interface PhoneCardProps {
  oldPhone: string; 
  newPhone: string; 
  onNewPhoneChange: (val: string) => void; 
  onSave: () => void; 
}

const PhoneCard: React.FC<PhoneCardProps> = ({
  oldPhone,
  newPhone,
  onNewPhoneChange,
  onSave,
}) => {
  return (
    <Box p={6} borderRadius="12px" bg="white">
      <FormControl>
        <FormLabel fontWeight="bold" fontSize="lg" mb={4}>
          Изменение номера телефона
        </FormLabel>

        <FormLabel htmlFor="oldPhone" color="gray.600">
          Текущий номер телефона
        </FormLabel>
        <Input
          id="oldPhone"
          value={oldPhone}
          isReadOnly
          size="lg"
          focusBorderColor="#C8D9F8"
          background="#F5F5F5"
          border="none"
          mb={4}
        />

        <FormLabel htmlFor="newPhone" color="gray.600">
          Новый номер телефона
        </FormLabel>
        <Input
          id="newPhone"
          value={newPhone}
          onChange={(e) => onNewPhoneChange(e.target.value)}
          placeholder="Введите новый номер"
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

export default PhoneCard;
