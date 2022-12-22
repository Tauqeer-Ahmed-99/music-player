import React from "react";

const Dialog = ({
  heading,
  content,
  action,
  type,
  onAction,
  onClose,
  onCancel,
}: {
  heading: string;
  content: string;
  action: string;
  type: "info" | "warning" | "error";
  onAction: () => void;
  onClose?: () => void;
  onCancel: () => void;
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div
        className="fixed inset-0 top-0 left-0 w-screen h-screen transition-opacity bg-gray-500 bg-opacity-75"
        onClick={() => onClose?.()}
      ></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
          <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={`flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto ${
                    type === "info"
                      ? "bg-cyan-100"
                      : type === "warning"
                      ? "bg-orange-100"
                      : "bg-red-100"
                  }  rounded-full sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {/* <!-- Heroicon name: outline/exclamation-triangle --> */}
                  <svg
                    className={`w-6 h-6 ${
                      type === "info"
                        ? "text-cyan-600"
                        : type === "warning"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {heading}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                action === "none"
                  ? "hidden"
                  : "px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6"
              }
            >
              <button
                type="button"
                className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white ${
                  type === "info"
                    ? "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500"
                    : type === "warning"
                    ? "bg-orange-600  hover:bg-orange-700 focus:ring-orange-500"
                    : "bg-red-600  hover:bg-red-700 focus:ring-red-500"
                } border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {action}
              </button>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
