// LoginForm.tsx
import React from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch } from "@/app/store/hooks";
import { loginUser } from "@/features/UserRegistration/model/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Интерфейс для данных формы
interface ILoginFormInputs {
  email: string;
  password: string;
}

// Схема валидации
const schema: yup.ObjectSchema<ILoginFormInputs> = yup.object({
  email: yup
    .string()
    .email("Введите действительный email")
    .required("Введите email")
    .defined(),
  password: yup.string().required("Введите пароль").defined(),
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    // Преобразуем поле email в identifier
    const credentials = {
      identifier: data.email,
      password: data.password,
    };

    try {
      const response = await dispatch(loginUser(credentials)).unwrap();

      if (response.token) {
        localStorage.setItem("token", response.token);
        toast({
          title: "Успешный вход.",
          description: "Вы успешно вошли в систему.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/profile");
      } else {
        toast({
          title: "Ошибка входа.",
          description: "Токен не получен.",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Ошибка входа.",
        description: error.message || "Неверный email или пароль.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH="60vh"
      align="center"
      justify="center"
      bg="fillSecondary"
    >
      <Box
        w={{ base: "90%", md: "500px" }}
        bg="white"
        borderRadius="lg"
        p={{ base: 6, md: 8 }}
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Войти
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
          <FormControl id="email" isInvalid={!!errors.email} isRequired>
          <FormLabel>Электронная почта</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Введите email"
            variant="filled"
            autoComplete="username" // добавляем атрибут
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>


            <FormControl id="password" isInvalid={!!errors.password} isRequired>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                placeholder="Введите пароль"
                variant="filled"
                autoComplete="current-password"
                {...register("password")}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="100%" colorScheme="blue" size="lg">
              Войти
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;
