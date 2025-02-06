import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@/widgets/Navbar";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Navbar title="профиль" buttonLabel="добавить" />
      <Box>
        аза черт
      </Box>
    </>
  );
};

export default ProfilePage;
