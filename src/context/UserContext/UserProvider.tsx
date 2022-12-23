import React, { useCallback, useEffect, useReducer } from "react";
import UserContext from "./UserContext";
import auth from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { ACTION_TYPE, IAction, IUserState } from "./userTypes";
import { useLocation, useNavigate } from "react-router-dom";

const initialUserState: IUserState = {
  user: null,
  isLoading: false,
  message: "No Message.",
  isError: false,
  errorMessage: "No Error Message.",
};

const userReducer = (state = initialUserState, action: IAction) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPE.CREATE_USER_START:
      return { ...state, isLoading: true };
    case ACTION_TYPE.CREATE_USER_SUCCESS:
      return {
        ...state,
        user: payload as User,
        message: "User created and logged in successfully.",
        isLoading: false,
      };
    case ACTION_TYPE.CREATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error?.message,
      };
    case ACTION_TYPE.USER_SIGNIN_START:
      return { ...state, isLoading: true };
    case ACTION_TYPE.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload as User,
        message: "User logged in successfully.",
        isLoading: false,
      };
    case ACTION_TYPE.USER_SIGNIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error?.message,
      };
    case ACTION_TYPE.USER_LOAD_START:
      return { ...state, isLoading: true };
    case ACTION_TYPE.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: payload as User,
        message: "User already logged in.",
        isLoading: false,
      };
    case ACTION_TYPE.USER_LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error?.message,
      };
    case ACTION_TYPE.USER_SIGNOUT_START:
      return { ...state, isLoading: true };
    case ACTION_TYPE.USER_SIGNOUT_SUCCESS:
      return {
        user: null,
        isLoading: false,
        message: "No Message.",
        isError: false,
        errorMessage: "No Error Message.",
      };
    case ACTION_TYPE.USER_SIGNOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      };
    case ACTION_TYPE.CLOSE_USER_ERROR_DIALOG:
      return { ...state, isError: false };
    default:
      return state;
  }
};

const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [user, dispatch] = useReducer(userReducer, initialUserState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const createAccount = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      dispatch({ type: ACTION_TYPE.CREATE_USER_START, payload: null });

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user.user as User, { displayName });

      dispatch({
        type: ACTION_TYPE.CREATE_USER_SUCCESS,
        payload: userCredentials.user,
      });

      navigate("/home");
    } catch (error: any) {
      dispatch({
        type: ACTION_TYPE.CREATE_USER_FAIL,
        payload: null,
        error,
      });
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      dispatch({ type: ACTION_TYPE.USER_SIGNIN_START, payload: null });

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch({
        type: ACTION_TYPE.USER_SIGNIN_SUCCESS,
        payload: userCredentials.user,
      });

      navigate("/home");
    } catch (error: any) {
      dispatch({
        type: ACTION_TYPE.USER_SIGNIN_FAIL,
        payload: null,
        error,
      });
    }
  };

  const signout = async () => {
    try {
      dispatch({ type: ACTION_TYPE.USER_SIGNOUT_START, payload: null });

      await signOut(auth);

      dispatch({ type: ACTION_TYPE.USER_SIGNOUT_SUCCESS, payload: null });

      navigate("/");
    } catch (error) {
      dispatch({ type: ACTION_TYPE.USER_SIGNOUT_FAIL, payload: null, error });
    }
  };

  const loadUser = useCallback(async () => {
    try {
      auth.onAuthStateChanged((user) => {
        dispatch({ type: ACTION_TYPE.USER_LOAD_START, payload: null });

        dispatch({
          type: ACTION_TYPE.USER_LOAD_SUCCESS,
          payload: user,
        });

        if (user) {
          if (pathname === "/login" || pathname === "/signup") {
            navigate("/home");
          } else {
            navigate(pathname);
          }
        } else {
          if (pathname === "/signup") {
            navigate(pathname);
          } else {
            navigate("/login");
          }
        }
      });
    } catch (error: any) {
      dispatch({ type: ACTION_TYPE.USER_LOAD_FAIL, payload: null, error });
    }
  }, [navigate, pathname]);

  useEffect(() => {
    const loadExistingUser = async () => {
      await loadUser();
    };
    loadExistingUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeErrorDialog = () => {
    dispatch({ type: ACTION_TYPE.CLOSE_USER_ERROR_DIALOG, payload: null });
  };

  const context = {
    user: user.user,
    isLoading: user.isLoading,
    isError: user.isError,
    message: user.errorMessage,
    errorMessage: user.errorMessage,
    createAccount,
    signin,
    signout,
    closeErrorDialog,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
