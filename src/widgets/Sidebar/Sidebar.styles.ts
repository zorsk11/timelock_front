
export const colors = {
  bg: "white",
  borderColor: "#D1D1D6",
  hoverBg: "#EDF2FD",
  hoverColor: "blue.500",
  activeLinkColor: "#1E1E1E",
  activeIconColor: "#4781E9",
  iconColor: "#8E8E93",
};

export const linkStyles = {
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  p: "10px",
  borderRadius: "8px",
  textDecoration: "none",
  _hover: { bg: colors.hoverBg, color: colors.hoverColor },
  _focus: { boxShadow: "outline" },
};
