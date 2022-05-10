import { Box, Container, Heading, Grid, Text, Image } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <>
      <Box>
        <Container maxWidth="container.lg" >
          <Box d="flex" alignItems="center" pt="20" flexDirection="row">
            <Box>
              <Heading>
                <Box>Welcome to my world !</Box>
              </Heading>
              <Box pt={1}>
                <Text fontSize={25}>
                  This is where the magic happens. This website made by Rustam
                  T.
                </Text>
              </Box>
            </Box>
            <Box pl={6} pb={5}>
              <Image w={400} src="https://bit.ly/3ybGtEm" borderRadius="full" />
            </Box>
          </Box>

          <Container maxW="container.lg" mt={10}>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={0}
              flexDirection="column"
            >
              <Box mr={5}>
                <Text pl="2" as="cite">
                  Easy to use
                </Text>
                <Image
                  mt="2"
                  borderRadius="lg"
                  w={370}
                  src="https://bit.ly/39BNvbn"
                />
              </Box>
              <Box>
                <Text pl="2" as="cite">
                  Easy to use
                </Text>
                <Image
                  mt="2"
                  borderRadius="lg"
                  w={370}
                  src="https://bit.ly/39BNvbn"
                />
              </Box>
            </Grid>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default Home;
