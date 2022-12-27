import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/Dialog/Dialog";

import ThemeContext, { Theme } from "../../context/ThemeContext/ThemeContext";
import UserContext from "../../context/UserContext/UserContext";
import useForm, { FieldValue } from "../../hooks/useForm";
import { emailRegex } from "../../utils/utilities";

const LoginScreen = () => {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      email: {
        value: "",
        validate: (email: FieldValue) => !emailRegex.test(email as string),
      },
      password: {
        value: "",
        validate: (password: FieldValue) => (password as string).length < 8,
      },
    }),
    []
  );

  const [
    fieldValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
  ] = useForm(initialValues);

  const handleLoginClick = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      userContext.signin(
        fieldValues.email as string,
        fieldValues.password as string
      );
    }
  };

  useEffect(() => {
    if (userContext.user) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={`flex items-center justify-center min-h-[calc(100vh-4rem)] px-5 py-5 ${
          themeContext.theme === Theme.Business ? "bg-gray-900" : "bg-gray-200"
        } min-w-screen`}
      >
        <div
          className={`w-full overflow-hidden text-gray-500 ${
            themeContext.theme === Theme.Business
              ? "bg-gray-700"
              : "bg-gray-100"
          } shadow-xl rounded-3xl`}
          style={{ maxWidth: "1000px" }}
        >
          <div className="w-full md:flex">
            <div className="items-center justify-center hidden w-1/2 px-10 py-10 bg-indigo-500 md:flex">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Mobile Icon"
              />
            </div>
            <div className="w-full px-5 py-10 md:w-1/2 md:px-10">
              <div className="mb-10 text-center">
                <h1
                  className={`text-3xl font-bold ${
                    themeContext.theme === Theme.Business
                      ? "text-white"
                      : "text-gray-900"
                  } `}
                >
                  LOGIN
                </h1>
                <p>Enter your information to login</p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="" className="px-1 text-xs font-semibold">
                      Email
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                        <i className="text-lg text-gray-400 mdi mdi-email-outline"></i>
                      </div>
                      <input
                        name="email"
                        type="email"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                        value={fieldValues.email as string}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    </div>
                    {fieldErrors.email && (
                      <span className="text-xs alert-error">
                        Please enter a valid email.
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label htmlFor="" className="px-1 text-xs font-semibold">
                      Password
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none">
                        <i className="text-lg text-gray-400 mdi mdi-lock-outline"></i>
                      </div>
                      <input
                        name="password"
                        type="password"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-500"
                        placeholder="************"
                        value={fieldValues.password as string}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    </div>
                    {fieldErrors.password && (
                      <span className="text-xs alert-error">
                        Password must be atleast 8 charcters long.
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      className="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:bg-indigo-700 btn"
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <button
                      onClick={() => navigate("/signup")}
                      className="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:bg-indigo-700 btn"
                    >
                      Signup Instead
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={userContext.isLoading}
        heading="Signing in"
        content={
          <span className="flex flex-col w-full">
            <span>Signing in, please wait...</span>
            <progress className="w-full mt-4 progress"></progress>
          </span>
        }
        type="info"
        action="none"
      />
      <Dialog
        open={userContext.isError}
        heading="Error"
        content={userContext.errorMessage}
        type="error"
        action="Close"
        onAction={() => userContext.closeErrorDialog()}
      />
    </>
  );
};

export default LoginScreen;
