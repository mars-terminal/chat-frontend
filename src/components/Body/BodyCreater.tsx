import { Avatar, Text, Button } from "@chakra-ui/react";
import React from "react";
import { IUser, IUserNullable } from "../../types";

interface IPeerProp {
  peer: IUser
  setPeer: React.Dispatch<React.SetStateAction<IUserNullable>>
  isContactSelected: boolean
  setIsContactSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const Body: React.FC<IPeerProp> = ({ peer, setPeer, isContactSelected, setIsContactSelected }) => {
  const HandleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]") as IUser[]
    
    localStorage.setItem("contacts", JSON.stringify([peer, ...contacts.filter(contact => contact.id !== peer.id)]))
    
    setPeer(peer)
    setIsContactSelected(!isContactSelected)
  }

  

  
  return (


    <Button
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      position={"relative"}
      width={"100%"}
      p={10}
      bgColor="gray.700"
      borderRadius={25}
      border='none'

      onClick={HandleClick}
    >
      <Avatar src="https://bit.ly/broken-link" />
      <Text m={2} fontSize="md">
        {peer.first_name} {peer.second_name}
      </Text>
    </Button>
  );
};

export default Body;
