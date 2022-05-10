import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useAuth from "../hooks/useAuth";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useAuth();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError(`. wrong password or email does not exist`);
      return;
    }

    loginUser({ email, password });
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Flex height={400} alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            background="blackAlpha.400"
            p={12}
            rounded={15}
          >
            <Heading mb={6}>Sign In</Heading>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              variant="filled"
              type="email"
              mb={3}
            />
            <Input
              min={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              variant="filled"
              mb={6}
              type="password"
            />
            <Button type="submit" colorScheme="green">
              Sign In
            </Button>
          </Flex>
        </Flex>
        {error && (
          <Flex alignItems="center" justifyContent="center" textColor="red.600">
            {<WarningIcon />}
            {error}
          </Flex>
        )}
      </form>
    </Box>
  );
}

export default SignIn;
