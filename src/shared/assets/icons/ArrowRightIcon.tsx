import { Icon, IconProps } from "@chakra-ui/react";

const CustomArrowRightIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" w="5" h="5" fill="none" {...props}>
    <path
      d="M9 18L15 12L9 6"
      stroke="#AEAEB2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default CustomArrowRightIcon;
