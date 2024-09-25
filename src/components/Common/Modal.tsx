import { twMerge } from "tailwind-merge";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: JSX.Element;
  body: JSX.Element;
  baseClassName: string;
}

const Modal = ({ isOpen, setIsOpen, title, body, baseClassName }: Props) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            className={twMerge(
              "bg-white h-auto w-auto rounded-lg shadow-lg p-6 z-10",
              baseClassName
            )}
          >
            {/* Title */}
            {title}
            {/* body */}
            {body}
            {/* Footer */}
            {/* <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Confirm
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
