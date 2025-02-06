import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  setRegistrationData,
  nextStep,
} from "@/features/UserRegistration/model/registrationSlice";
import {
  useRegisterMutation,
  useCompleteProfileMutation,
} from "@/features/UserRegistration/model/userApi";
import { RootState } from "@/app/store";
import { setToken } from "../../model/authSlice";

export const usePersonalInformationStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const registrationData = useSelector(
    (state: RootState) => state.userRegistrationReducer.registrationData
  );

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [completeProfile, { isLoading: isCompletingProfile }] =
    useCompleteProfileMutation();

  const handlePersonalInformation = async (profileData: any) => {
    try {
      const registerPayload = {
        email: registrationData.email || profileData.email,
        phone_number: registrationData.phone_number || profileData.phone_number,
        password: profileData.password,
        organization_type: "manufacturer",
      };
      const registerResponse = await registerUser(registerPayload).unwrap();
      const token = registerResponse.token;

      if (token) {
        dispatch(setToken(token));
      } else {
        console.error("No token received from server.");
        return;
      }

      const completeProfilePayload = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        phone_number: registrationData.phone_number,
      };
      await completeProfile(completeProfilePayload).unwrap();

      dispatch(setRegistrationData(profileData));

      toast({
        title: "Профиль завершен.",
        description: "Теперь вы можете войти в систему.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/complete-company-info");
    } catch (error: any) {
      toast({
        title: "Ошибка завершения регистрации.",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    handlePersonalInformation,
    isRegistering,
    isCompletingProfile,
  };
};
