import { Box } from "@chakra-ui/react";
import { useState } from "react";
import MessageBody from "../components/Body/Message/Message"
import UserBody from "../components/Body/User"
import { IUserNullable } from "../types/user";

const Main = () => {
  const [peer, setPeer] = useState<IUserNullable>();

  return (
    <>
      <Box width="100%" height={"100%"}>
        <Box
          p={4}
          position={"relative"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          textColor="white"
        >
          <UserBody peer={peer} setPeer={setPeer} />
          
          <MessageBody peer={peer} setPeer={setPeer} />
        </Box>
      </Box>
    </>
  );
};

export default Main;
