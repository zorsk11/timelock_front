import { Input, InputProps } from "@chakra-ui/react";

const InputField = ({ ...props }: InputProps) => {
  return <Input {...props} />;
};

export default InputField;