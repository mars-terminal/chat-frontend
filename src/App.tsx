import Home from "./routes/Home";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Main from "./routes/Main";
import Settings from "./components/Settings";
import { Header } from "./components/Header";
import { UserContext } from "./hooks/UserContext";
import useFindUser from "./hooks/useFindUser";
import { Box } from "@chakra-ui/react";

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            {!user && (
              <>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </>
            )}
                <Route path="/main" element={<Main />} />
                <Route path="/friends" element={<Settings />} />
                <Route path="/settings" element={<Settings />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </UserContext.Provider>
      </Router>
    </Box>
  );
};

export default App;
