import {
  Box,
  Button,
  Skeleton,
  useMediaQuery,
  Text,
  Divider,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  IBackendError,
  ICreateMessageQuery,
  IMessage,
  IUser,
  IUserNullable,
} from "../../../types";
import { ArrowBackIcon } from "@chakra-ui/icons";

import style from "./style.module.css";
import { useInput } from "../../../hooks/useInput";
import { BaseAPI } from "../../../service/api";
import { UserContext } from "../../../hooks/UserContext";

interface IMessagesProps {
  peer: IUserNullable;
  setPeer: React.Dispatch<React.SetStateAction<IUserNullable>>;
}

interface IMessageListProps {
  peer: IUser;
  setPeer: React.Dispatch<React.SetStateAction<IUserNullable>>;
  isLessThan600: boolean;
}

const Message: React.FC<IMessage & {peer: IUser}> = ({
  id,
  text,
  chat_id,
  peer_id,
  created_at,
  updated_at,
  peer,
}) => {
  const { user } = useContext(UserContext);

  const u = chat_id === peer.id ? peer : user

  return (
    <Box
      display={"flex"}
      alignItems={user?.id === chat_id ? "flex-end" : "flex-start"}
      flexDirection="column"
      width={"100%"}
    >
      <Box display="flex" flexDirection={user?.id === chat_id ? "row-reverse" : "row"} bgColor="gray.700" px={4} py={1} borderRadius={"12px"}>
        <Box>{u?.first_name}</Box>
        <Box>{text}</Box>
      </Box>
    </Box>
  );
};

const MessageList: React.FC<IMessageListProps> = ({
  peer,
  setPeer,
  isLessThan600,
}) => {
  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const message = useInput("");

  useEffect(() => {
    (async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };

      if (user === undefined) {
        alert("Something wrong");
        return;
      }
      setIsLoading(true);
      const response = await axios.get<IMessage[] | IBackendError>(
        `${BaseAPI}/message/${user?.id}/${peer.id}`,
        { headers }
      );
      setIsLoading(false);

      if (response.status !== 200) {
        const data = response.data as IBackendError;
        setError(data.message);
        return;
      }

      const data = response.data as IMessage[];

      setMessages([...data]);
    })();
  }, [user?.id, peer.id, user]);

  const HandleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    if (user === undefined) {
      alert("Something wrong");
    }

    const payload: ICreateMessageQuery = {
      text: message.value,
      chat_id: (user as IUser).id,
      peer_id: peer.id,
    };

    const response = await axios.post<IMessage | IBackendError>(
      `${BaseAPI}/message/create`,
      payload,
      { headers }
    );

    if (response.status !== 200) {
      const data = response.data as IBackendError;
      setError(data.message);
      return;
    }

    const data = response.data as IMessage;

    setMessages([...messages, data]);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pr={"3%"}
        pl={"7%"}
        pt="1%"
      >
        {peer.first_name} {peer.second_name}
        {isLessThan600 && (
          <Button bgColor="gray.700" onClick={(e) => setPeer(undefined)}>
            <ArrowBackIcon />
          </Button>
        )}
      </Box>

      <Divider orientation="horizontal" borderColor="blackAlpha.700" pb="1%" />

      <Box
        mt={4}
        mx={4}
        p={4}
        height={"80%"}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        bgColor="gray.800"
        borderRadius="10"
      >
        <Skeleton isLoaded={!isLoading} height={"100%"}>
          {
            <Box p={2} mr={0} borderRadius={10}>
              {messages.map((message) => (
                <Message {...message} peer={peer} />
              ))}
            </Box>
          }
        </Skeleton>
      </Box>

      <form onSubmit={HandleSendMessage}>
        <Box
          className={style.spaceChildren}
          display={"flex"}
          flexDirection={"row"}
          p={4}
        >
          <Input placeholder={"Message"} {...message} />
          <Button type="submit" color={"gray"}>
            Send
          </Button>
        </Box>
      </form>
    </>
  );
};

const Messages: React.FC<IMessagesProps> = ({ peer, setPeer }) => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  if (isLessThan600 && !peer) {
    return <></>;
  }

  return (
    <Box w={"100%"} h={"100%"} position={"relative"}>
      <Box
        bgColor="gray.700"
        pl={10}
        borderWidth="thin"
        borderColor="white"
        borderRadius={6}
      >
        Chat
      </Box>
      <Box
        borderRadius={6}
        borderWidth="thin"
        borderColor="white"
        bgColor="gray.600"
        h="700px"
      >
        {peer && (
          <MessageList
            peer={peer}
            setPeer={setPeer}
            isLessThan600={isLessThan600}
          />
        )}
        {!peer && (
          <Text pl={12} pt={16} fontSize="4xl" color="gray.300">
            Select someone by his Nick Name and start texting to each other. ♥
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Messages;
