import { createContext } from "react";
import { IUserNullable } from "../types";

export const UserContext = createContext<{
  user: IUserNullable;
  setUser: React.Dispatch<React.SetStateAction<IUserNullable>>;
  isLoading: boolean;
}>({user: undefined, setUser: () => {}, isLoading: false });
