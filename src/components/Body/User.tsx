import {
  StackDivider,
  VStack,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IUser, IUserNullable } from "../../types";

import Body from "./BodyCreater";
import SearchUser from "./SearchUser";

interface IUserProps {
  peer: IUserNullable;
  setPeer: React.Dispatch<React.SetStateAction<IUserNullable>>;
}

const Users: React.FC<IUserProps> = ({ peer, setPeer }) => {
  const [peers, setPeers] = useState<IUser[]>([]);
  const [searchPeers, setSearchPeers] = useState<IUser[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isContactSelected, setIsContactSelected] = useState(false)
  
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]") as IUser[]

    setPeers(contacts)
  }, [isContactSelected]);

  if (isLessThan600 && peer) {
    return <></>;
  }

  const users = !isSearching ? peers : searchPeers


  return (
    <Box
      display="flex"
      flexDirection="column"
      position={"relative"}
      width={!isLessThan600 ? "40%" : "100%"}
    >
      <Box
        bgColor="gray.700"
        px={10}
        borderWidth="thin"
        borderColor="white"
        borderRadius={6}
      >
        Users
      </Box>
      <Box
        bgColor="gray.600"
        borderWidth="thin"
        borderRadius={6}
        borderColor="blackAlpha.700"
        px={10}
        pt={3}
        overflowY="auto"
        height={"700px"}
      >
        <SearchUser setSearchUsers={setSearchPeers} setIsSearching={setIsSearching} />

        <VStack mt={3} divider={<StackDivider borderColor="blackAlpha.700" />}>
          {users.map((user) => (
            <Body peer={user} setPeer={setPeer} isContactSelected={isContactSelected} setIsContactSelected={setIsContactSelected}/>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Users;
