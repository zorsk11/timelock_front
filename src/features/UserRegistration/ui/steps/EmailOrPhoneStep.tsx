import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  setRegistrationData,
  nextStep,
} from "@/features/UserRegistration/model/registrationSlice";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  emailOrPhone: string;
}

const phoneRegExp = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

const schema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required("Введите email или номер телефона")
    .test(
      "emailOrPhone",
      "Введите действительный email или номер телефона",
      function (value) {
        const emailValid = yup.string().email().isValidSync(value);
        const phoneValid = phoneRegExp.test(value || "");
        return emailValid || phoneValid;
      }
    ),
});

const formatPhoneNumber = (value: string) => {
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 1) return `+${onlyNums}`;
  if (onlyNums.length <= 4) return `+7 (${onlyNums.slice(1)}`;
  if (onlyNums.length <= 7)
    return `+7 (${onlyNums.slice(1, 4)}) ${onlyNums.slice(4)}`;
  if (onlyNums.length <= 9)
    return `+7 (${onlyNums.slice(1, 4)}) ${onlyNums.slice(
      4,
      7
    )}-${onlyNums.slice(7)}`;
  return `+7 (${onlyNums.slice(1, 4)}) ${onlyNums.slice(4, 7)}-${onlyNums.slice(
    7,
    9
  )}-${onlyNums.slice(9, 11)}`;
};

const EmailOrPhoneStep: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "" || /^[\w@.-]+$/.test(value)) {
      setInputValue(value);
      setValue("emailOrPhone", value, { shouldValidate: true });
    } else if (/^\+7/.test(value) || /^[0-9]*$/.test(value)) {
      const formattedValue = formatPhoneNumber(value);
      setInputValue(formattedValue);
      setValue("emailOrPhone", formattedValue, { shouldValidate: true });
    } else {
      setInputValue(value);
      setValue("emailOrPhone", value, { shouldValidate: true });
    }
  };

  const onSubmit = (data: FormValues) => {
    const emailOrPhone = data.emailOrPhone;
    const isEmail = /^\S+@\S+\.\S+$/.test(emailOrPhone);
    const isPhone = phoneRegExp.test(emailOrPhone);

    dispatch(
      setRegistrationData({
        email: isEmail ? emailOrPhone : undefined,
        phone_number: isPhone ? emailOrPhone : undefined,
      })
    );

    dispatch(nextStep());

    toast({
      title: "Данные сохранены.",
      description:
        "Проверьте вашу почту или телефон для получения кода подтверждения.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center">
        <Text mb="46px" textStyle="largeTitle" fontWeight="bold">
          Регистрация
        </Text>
        <FormControl isInvalid={!!errors.emailOrPhone} mb="24px">
          <Input
            placeholder="E-mail или номер телефона"
            variant="auth"
            {...register("emailOrPhone")}
            value={inputValue}
            onChange={handleInputChange}
          />
          <FormErrorMessage>
            {errors.emailOrPhone && errors.emailOrPhone.message}
          </FormErrorMessage>
        </FormControl>
        <Button w="100%" type="submit" variant="auth">
          Получить код
        </Button>
        <Text textAlign="center" textStyle="title3" textColor="gray.500" mt="4">
          Уже есть аккаунт?{" "}
          <Text
            as="span"
            textStyle="title3"
            textColor="blue.400"
            cursor="pointer"
            textDecoration="underline"
            onClick={() => navigate("/login")}
          >
            Войти
          </Text>
        </Text>
      </Stack>
    </form>
  );
};

export default EmailOrPhoneStep;
