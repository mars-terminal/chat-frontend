import { useState, useEffect } from "react";
import axios from "axios";
import { IBackendError, IUser, IUserNullable } from "../types";
import { BaseAPI } from "../service/api";


export default function useFindUser() {
  const [user, setUser] = useState<IUserNullable>();
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    async function findUser() {
      const accessToken = localStorage.getItem("access_token")
      if (!accessToken) {
        return
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await axios.get<IUser | IBackendError>(`${BaseAPI}/users/me`, { headers });
      if (response.status !== 200) {
        const body = response.data as IBackendError
  
        console.log(body)
        setLoading(false)
        return
      }
  
      const responseData = response.data as IUser;
      setUser(responseData);
      setLoading(false)
    }
    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
