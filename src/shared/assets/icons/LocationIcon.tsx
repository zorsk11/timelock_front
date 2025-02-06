import { Icon, IconProps } from '@chakra-ui/react';

const CustomLocationIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" w="5" h="5" fill="none" {...props}>
    <path
      d="M13.3332 7.16659C13.3332 10.4953 9.6405 13.9619 8.4005 15.0326C8.28499 15.1194 8.14437 15.1664 7.99984 15.1664C7.85531 15.1664 7.71469 15.1194 7.59917 15.0326C6.35917 13.9619 2.6665 10.4953 2.6665 7.16659C2.6665 5.7521 3.22841 4.39554 4.2286 3.39535C5.2288 2.39516 6.58535 1.83325 7.99984 1.83325C9.41433 1.83325 10.7709 2.39516 11.7711 3.39535C12.7713 4.39554 13.3332 5.7521 13.3332 7.16659Z"
      stroke="#4781E9"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 9.1665C9.10457 9.1665 10 8.27107 10 7.1665C10 6.06193 9.10457 5.1665 8 5.1665C6.89543 5.1665 6 6.06193 6 7.1665C6 8.27107 6.89543 9.1665 8 9.1665Z"
      stroke="#4781E9"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default CustomLocationIcon;
