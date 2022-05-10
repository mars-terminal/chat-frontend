import { Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { BaseAPI } from "../../service/api";
import { IBackendError, IUser } from "../../types";

interface ISearchUsersProps {
  setSearchUsers: React.Dispatch<React.SetStateAction<IUser[]>>
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
}




const SearchUser: React.FC<ISearchUsersProps> = ({setSearchUsers, setIsSearching}) => {
  const [error, setError] = useState("");
  const search = useInput("")

  useEffect(() => {
    setIsSearching(search.value.length !== 0)
  }, [search.value, setIsSearching])

  useMemo(() => {
    (async () => {
      if (search.value.length < 2) {
        return
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
    
      const response = await axios.get<IUser[] | IBackendError>(`${BaseAPI}/users/search/${search.value}`, {headers})

      if (response.status !== 200) {
        const data = response.data as IBackendError
        setError(data.message);
        return
      }

      const data = response.data as IUser[]

      setSearchUsers(data)
    })()  
  }, [search.value, setSearchUsers])


  return (
    <>
      <Box>
        <Input
          inlineSize={"100%"}
          borderRadius={15}
          size="md"
          placeholder="Search "
          mr={1}
          {...search}
        />
      </Box>
    </>
  );
};

export default SearchUser;
