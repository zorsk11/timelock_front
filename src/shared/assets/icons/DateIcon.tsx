import { Icon, IconProps } from '@chakra-ui/react';

const CustomDateIcon = (props: IconProps) => (
  <Icon w="5" h="5" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M8.00016 15.1668C11.6821 15.1668 14.6668 12.1821 14.6668 8.50016C14.6668 4.81826 11.6821 1.8335 8.00016 1.8335C4.31826 1.8335 1.3335 4.81826 1.3335 8.50016C1.3335 12.1821 4.31826 15.1668 8.00016 15.1668Z"
      stroke="#4781E9"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 4.5V8.5L9.66667 11.1667"
      stroke="#4781E9"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default CustomDateIcon;
