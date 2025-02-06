import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setRegistrationData,
} from "@/features/UserRegistration/model/registrationSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  code: string;
}

const schema = yup.object().shape({
  code: yup
    .string()
    .required("Введите код подтверждения")
    .matches(/^\d{6}$/, "Код должен быть 6 цифр"),
});

const VerificationCodeStep: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    // Here you can add logic to verify the code via API
    // For now, we'll proceed to the next step
    dispatch(nextStep());
    toast({
      title: "Код подтверждения введен.",
      description: "Переход к следующему шагу.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePinComplete = (_value: string) => {
    handleSubmit(onSubmit)();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center">
        <Text mb="16px" textStyle="largeTitle">
          Проверьте почту или телефон
        </Text>
        <Box w="70%">
          <Text
            mb="46px"
            textAlign="center"
            textStyle="title3"
            textColor="gray.500"
          >
            Мы отправили код на ваш email или телефон.
          </Text>
        </Box>
        <FormControl isInvalid={!!errors.code}>
          <Controller
            name="code"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <HStack justify="center">
                <PinInput
                  size="lg"
                  otp
                  onComplete={handlePinComplete}
                  focusBorderColor="blue.500"
                  manageFocus
                  placeholder=""
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <PinInputField
                      key={index}
                      w="82px"
                      h="82px"
                      fontSize="2xl"
                      textAlign="center"
                      bgColor="fillSecondaryLight"
                      borderRadius="12px"
                      border="none"
                      p="32px"
                    />
                  ))}
                </PinInput>
              </HStack>
            )}
          />
          <FormErrorMessage>
            {errors.code && errors.code.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};

export default VerificationCodeStep;
