import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const url = `http://localhost:8000/auth/sign-up`;


function SignUp() {

  const [first_name, setFirstName] = useState("");
  const [second_name, setSecondName] = useState("");
  const [nick_name, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser } = useAuth();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     
    e.preventDefault();

    registerUser({ first_name, second_name, nick_name, email, phone, password });
  };

  return (
    <>
      <Box >
        <Flex height={610} alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            background="blackAlpha.400"
            p={12}
            rounded={15}
          >
            <Heading mb={6}>Sign Up</Heading>
            <Input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              variant="filled"
              type='text'
              mb={3}
            />
            <Input
              value={second_name}
              onChange={(e) => setSecondName(e.target.value)}
              placeholder="Second Name"
              variant="filled"
              type='text'
              mb={3}
            />
            <Input
              value={nick_name}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="Nick Name"
              variant="filled"
              type='text'
              mb={3}
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 706 667 666"
              variant="filled"
              type='tel'
              mb={3}
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              variant="filled"
              type="email"
              mb={3}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              variant="filled"
              mb={6}
              type="password"
            />
            <Button onClick={onSubmit} colorScheme="green">
                Sign Up
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default SignUp;
