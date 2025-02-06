import { Icon, IconProps } from '@chakra-ui/react';

const CustomUploadIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" w="5" h="5" fill="none" {...props}>
    <path
      d="M21 15.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V15.5"
      stroke="#4781E9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 8.5L12 3.5L7 8.5"
      stroke="#4781E9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3.5V15.5"
      stroke="#4781E9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default CustomUploadIcon;
