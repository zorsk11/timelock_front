import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input, InputProps } from "@chakra-ui/react";

type NumericFormatInputProps = NumericFormatProps<InputProps>;

const NumericFormatInput = forwardRef<
  HTMLInputElement,
  NumericFormatInputProps
>((props, ref) => {
  return <NumericFormat {...props} getInputRef={ref} customInput={Input} />;
});

NumericFormatInput.displayName = "NumericFormatInput";

export default NumericFormatInput;
