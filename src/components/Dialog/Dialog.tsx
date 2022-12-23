import React from "react";

const Dialog = ({
  open,
  heading,
  content,
  action,
  type,
  onAction,
  onClose,
  onCancel,
}: {
  open: boolean;
  heading: string;
  content: React.ReactNode;
  action: string;
  type: "info" | "warning" | "error";
  onAction?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        checked={open}
        className="modal-toggle"
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <div className="sm:flex sm:items-star">
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
              <h3 className="text-lg font-bold">{heading}</h3>
              <p className="py-4">{content}</p>
            </div>
          </div>
          <div className={action === "none" ? "hidden" : "modal-action"}>
            {action.toLowerCase() !== "close" && (
              <label
                htmlFor="my-modal"
                className="btn btn-ghost"
                onClick={() => onCancel?.()}
              >
                Cancel
              </label>
            )}
            <label
              htmlFor="my-modal"
              className={`btn cursor-pointer inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white ${
                type === "info"
                  ? "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500"
                  : type === "warning"
                  ? "bg-orange-600  hover:bg-orange-700 focus:ring-orange-500"
                  : "bg-red-600  hover:bg-red-700 focus:ring-red-500"
              } border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
              onClick={() => onAction?.()}
            >
              {action}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
