import { Icon, IconProps } from "@chakra-ui/react";

const CustomAddIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" w="5" h="5" fill="none" {...props}>
    <path
      d="M5 12H19"
      stroke="#4781E9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5V19"
      stroke="#4781E9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default CustomAddIcon;
