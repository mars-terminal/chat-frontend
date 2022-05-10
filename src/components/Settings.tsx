import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import axios from "axios";
import { IBackendError, IUser } from "../types";
import { BaseAPI } from "../service/api";
import { useInput } from "../hooks/useInput";

interface IUpdateRequest {
  first_name: string;
  second_name: string;
  nick_name: string;
  phone: string;
  email: string;
  password: string;
}

function Settings() {
  const [error, setError] = useState("");

  const firstName = useInput("");
  const secondName = useInput("");
  const nickName = useInput("");
  const phone = useInput("");
  const email = useInput("");
  const password = useInput("");

  const UpdateUser = async (data: IUpdateRequest) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    const response = await axios.put<IUser | IBackendError>(
      `${BaseAPI}/users/update`,
      data,
      { headers }
    );
    if (response.status !== 200) {
      const body = response.data as IBackendError;

      setError(body.message);
      return;
    }
  };

  const HandleSave = (e: React.MouseEvent) => {
    e.preventDefault();

    UpdateUser({
      first_name: firstName.value,
      second_name: secondName.value,
      nick_name: nickName.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Flex direction="column" pt={12}>
          <Text mb={3} fontSize="lg">
            Fill the fields
          </Text>
          <Input
            variant="filled"
            placeholder="Fisrt Name"
            bgColor="blackAlpha.700"
            mb={1}
            {...firstName}
          />
          <Input
            variant="filled"
            placeholder="Second Name"
            bgColor="blackAlpha.700"
            mb={1}
            {...secondName}
          />
          <Input
            variant="filled"
            placeholder="Nick Name"
            bgColor="blackAlpha.700"
            mb={1}
            {...nickName}
          />
          <Input
            variant="filled"
            placeholder="Phone"
            bgColor="blackAlpha.700"
            mb={1}
            {...phone}
          />
          <Input
            variant="filled"
            placeholder="mail@gmail.com"
            bgColor="blackAlpha.700"
            mb={1}
            {...email}
          />
          <Input
            variant="filled"
            placeholder="password"
            bgColor="blackAlpha.700"
            mb={4}
            {...password}
          />
          <Button bgColor="Tomato" onClick={HandleSave}>
            Save
          </Button>
        </Flex>
      </Flex>

      <Flex
        flexWrap="wrap"
        mt="auto"
        bgColor="gray.100"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text ml={3} mt={3}>
          Work gmail: terminalbanka@gmailc.com
        </Text>
        <Text ml={3}>Telegram@: @terminalbanka</Text>

        <Text ml={3} fontSize="md">
          If you want to report a problem
        </Text>
        <Button onClick={onOpen} leftIcon={<EmailIcon />} bgColor="gray.500">
          Email
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bgColor="gray.600">
            <ModalHeader>Report the problem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="Title" mb={4} />
              <Input placeholder="Description" h={300} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={2} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" bgColor="green.500">
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}

export default Settings;
