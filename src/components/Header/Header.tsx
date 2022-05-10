import { HamburgerIcon, ChatIcon, SettingsIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Image, Button, Menu, MenuButton, MenuItem, MenuList, MenuDivider, IconButton} from "@chakra-ui/react";
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

import style from "./style.module.css";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function settings(){
    navigate("/settings")
  };
  function mainChap(){
    navigate("main")
  };
  function logout() {
    localStorage.clear();
    setUser(undefined)
    navigate('/')
  }

  return (
    <>
      <header>
        <Box
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgColor="black"
        >
          <Box>
            <Image
              boxSize="50px"
              src="https://realtime-chat.jamesisme.com/images/favicon.png"
              alt="brandLogo"
            />
          </Box>

          {!user && (
            <Box className={style.spaceChild}>
              <Button
                colorScheme=""
                color="green.300"
                size="xs"
                fontSize="medium"
                variant="solid"
              >
                <Link to="/sign-in" style={{ textDecoration: "none" }}>
                  Sign In
                </Link>
              </Button>
              <Button
                colorScheme="purple"
                size="xs"
                fontSize="medium"
                variant="outline"
              >
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </Button>
            </Box>
          )}

          {user && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant="outline"
                size="md"
              >
                Menu
              </MenuButton>
                <MenuList bgColor="black" textColor="gray.600" >
                  <MenuItem onClick={mainChap}><ChatIcon color='green'/>. Chat</MenuItem>
                  <MenuItem onClick={settings}><SettingsIcon/>. Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout} ><ViewOffIcon color='gray.600'/>. Logout </MenuItem>
                </MenuList>
            </Menu>
          )}
        </Box>
      </header>
    </>
  );
};

export default Header;
