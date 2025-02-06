import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePersonalInformationStep } from "@/features/UserRegistration/lib/hooks/usePersonalInformationStep";

interface FormValues {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone_number?: string | null;
  password: string;
  confirmPassword: string;
}

const createSchema = (missingField: "email" | "phone_number") => {
  return yup.object({
    first_name: yup.string().required("Введите имя"),
    last_name: yup.string().required("Введите фамилию"),
    email:
      missingField === "email"
        ? yup
            .string()
            .email("Введите действительный email")
            .required("Введите email")
        : yup.string().email("Введите действительный email").nullable(),
    phone_number:
      missingField === "phone_number"
        ? yup
            .string()
            .required("Введите номер телефона")
            .matches(
              /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
              "Введите действительный номер телефона"
            )
        : yup.string().nullable(),
    password: yup
      .string()
      .required("Введите пароль")
      .min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: yup
      .string()
      .required("Введите подтверждение пароля")
      .oneOf([yup.ref("password")], "Пароли должны совпадать"),
  });
};

interface Props {
  missingField: "email" | "phone_number";
}

const PersonalInformationStep: React.FC<Props> = ({ missingField }) => {
  const { handlePersonalInformation, isRegistering, isCompletingProfile } =
    usePersonalInformationStep();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createSchema(missingField)),
  });

  const onSubmit = (data: FormValues) => {
    handlePersonalInformation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center">
        <Text mb="46px" textStyle="largeTitle" fontWeight="bold">
          Личная информация
        </Text>
        {/* First Name */}
        <FormControl isInvalid={!!errors.first_name} mb="12px">
          <Input
            placeholder="Имя"
            w="100%"
            border="none"
            variant="auth"
            {...register("first_name")}
          />
          <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
        </FormControl>
        {/* Last Name */}
        <FormControl isInvalid={!!errors.last_name} mb="12px">
          <Input
            placeholder="Фамилия"
            w="100%"
            border="none"
            variant="auth"
            {...register("last_name")}
          />
          <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
        </FormControl>
        {/* Email or Phone Number */}
        {missingField === "email" && (
          <FormControl isInvalid={!!errors.email} mb="12px">
            <Input
              placeholder="Email"
              w="100%"
              border="none"
              variant="auth"
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        )}
        {missingField === "phone_number" && (
          <FormControl isInvalid={!!errors.phone_number} mb="12px">
            <Controller
              name="phone_number"
              control={control}
              render={({ field: { onChange, onBlur, ref } }) => (
                <IMaskInput
                  mask="+7 (000) 000-00-00"
                  placeholder="+7 (___) ___-__-__"
                  onAccept={(value: any) => onChange(value)}
                  onBlur={onBlur}
                  inputRef={ref}
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "12px",
                    backgroundColor: "#F5F5F5",
                    padding: "20px 32px",
                    fontWeight: "normal",
                    fontSize: "20px",
                    lineHeight: "120%",
                  }}
                />
              )}
            />
            <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
          </FormControl>
        )}
        {/* Password */}
        <FormControl isInvalid={!!errors.password} mb="12px">
          <Input
            placeholder="Пароль"
            w="100%"
            border="none"
            variant="auth"
            type="password"
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        {/* Confirm Password */}
        <FormControl isInvalid={!!errors.confirmPassword} mb="12px">
          <Input
            placeholder="Повторите пароль"
            w="100%"
            border="none"
            variant="auth"
            type="password"
            {...register("confirmPassword")}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        {/* Submit Button */}
        <Button
          w="100%"
          variant="auth"
          type="submit"
          isLoading={isRegistering || isCompletingProfile}
        >
          Продолжить
        </Button>
      </Stack>
    </form>
  );
};

export default PersonalInformationStep;
