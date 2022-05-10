import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseAPI } from "../service/api";
import { IBackendError, IUser } from "../types";
import { UserContext } from "./UserContext";

interface ISignUpRequest {
  first_name: string;
  second_name: string;
  nick_name: string;
  phone: string;
  email: string;
  password: string;
}

interface ISignInRequest {
  email: string;
  password: string;
}

interface ITokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export default function useAuth() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const setUserContext = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    const response = await axios.get<IUser | IBackendError>(`${BaseAPI}/users/me`, { headers });
    if (response.status !== 200) {
      const body = response.data as IBackendError

      setError(body.message)
      return
    }

    const responseData = response.data as IUser;
    setUser(responseData);
    navigate("/main")
  };

  const registerUser = async (data: ISignUpRequest) => {
    const response = await axios.post<ITokenResponse | IBackendError>(`${BaseAPI}/auth/sign-up`, data);
    if (response.status !== 200) {
      const body = response.data as IBackendError

      setError(body.message)
      return
    }
    const responseData = response.data as ITokenResponse;


    localStorage.setItem("access_token", responseData.access_token);
    localStorage.setItem("refresh_token", responseData.refresh_token);
    await setUserContext();
    navigate("/main")
  };

  const loginUser = async (data: ISignInRequest) => {
    const response = await axios.post<ITokenResponse | IBackendError>(`${BaseAPI}/auth/sign-in`, data);
    if (response.status !== 200) {
      const body = response.data as IBackendError

      setError(body.message)
      return
    }


    const responseData = response.data as ITokenResponse;

    localStorage.setItem("access_token", responseData.access_token);
    localStorage.setItem("refresh_token", responseData.refresh_token);

    await setUserContext();
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
