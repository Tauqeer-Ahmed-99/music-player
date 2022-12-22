import { User } from "firebase/auth";

export enum ACTION_TYPE {
  CREATE_USER_START = "CREATE_USER_START",
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL = "CREATE_USER_FAIL",
  USER_SIGNIN_START = "USER_SIGNIN_START",
  USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS",
  USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL",
  USER_LOAD_START = "USER_LOAD_START",
  USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS",
  USER_LOAD_FAIL = "USER_LOAD_FAIL",
  USER_SIGNOUT_START = "USER_SIGNOUT_START",
  USER_SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS",
  USER_SIGNOUT_FAIL = "USER_SIGNOUT_FAIL",
  CLOSE_USER_ERROR_DIALOG = "CLOSE_USER_ERROR_DIALOG",
}

export interface IAction {
  type: ACTION_TYPE;
  payload: User | null;
  error?: any;
}

export interface IUserState {
  user: null | User;
  isLoading: boolean;
  message: string;
  isError: boolean;
  errorMessage: string;
}
