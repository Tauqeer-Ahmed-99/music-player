import { createContext } from "react";
import { User } from "firebase/auth";

export interface IUserContext {
  user: null | User;
  isLoading: boolean;
  isError: boolean;
  message: string;
  errorMessage: string;
  createAccount: (
    email: string,
    password: string,
    displayName: string,
    getUserMusicData: (uid?: string, authToken?: string) => void
  ) => Promise<void>;
  signin: (email: string, password: string) => void;
  signout: () => void;
  closeErrorDialog: () => void;
}

const initialContext: IUserContext = {
  user: null,
  isLoading: false,
  isError: false,
  message: "No Message.",
  errorMessage: "No Error Message.",
  createAccount: async (
    email: string,
    password: string,
    displayName: string,
    getMusicData: (uid: string) => void
  ) => {},
  signin: (email: string, password: string) => {},
  signout: () => {},
  closeErrorDialog: () => {},
};

const UserContext = createContext(initialContext);

export default UserContext;
