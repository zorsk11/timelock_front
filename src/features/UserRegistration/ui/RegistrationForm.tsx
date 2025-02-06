import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { prevStep } from "@/features/UserRegistration/model/registrationSlice";
import EmailOrPhoneStep from "./steps/EmailOrPhoneStep";
import VerificationCodeStep from "./steps/VerificationCodeStep";
import PersonalInformationStep from "./steps/PersonalInformationStep";

const steps = ["emailOrPhone", "verificationCode", "personalInformation"];

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  // Обращаемся к свойству, как оно названо в combineReducers
  const step = useSelector(
    (state: RootState) => state.userRegistration.step
  );
  const registrationData = useSelector(
    (state: RootState) => state.userRegistration.registrationData
  );

  const renderStepContent = () => {
    switch (steps[step]) {
      case "emailOrPhone":
        return <EmailOrPhoneStep />;
      case "verificationCode":
        return <VerificationCodeStep />;
      case "personalInformation":
        // Если email заполнен, предлагаем указать номер телефона, иначе email
        const missingField = registrationData.email ? "phone_number" : "email";
        return <PersonalInformationStep missingField={missingField} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Progress Bar */}
      {step >= 1 && (
        <Flex w="100%" justifyContent="center" mt="16px" mb="24px">
          <Flex w="95%" justifyContent="space-between">
            {["Ввод данных", "Подтверждение", "Личная информация"].map(
              (label, index) => (
                <Box
                  key={index}
                  h="6px"
                  flex="1"
                  mx="4px"
                  bg={index < step ? "blue.400" : "gray.300"}
                  borderRadius="8px"
                  transition="background-color 0.3s"
                />
              )
            )}
          </Flex>
        </Flex>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        bgColor="fillSecondary"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          w={{ base: "100%", "2xl": "770px" }}
          minW={{ base: "100%", sm: "770px" }}
          p="0px"
        >
          <Box
            p={{ base: "36px", sm: "56px" }}
            w={{ base: "100%", sm: "660px" }}
            bg="white"
            borderRadius="24px"
          >
            {renderStepContent()}
            {step > 0 && (
              <Button
                w="100%"
                size="lg"
                variant="ghost"
                onClick={() => dispatch(prevStep())}
                mt="4"
              >
                Назад
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RegistrationForm;
