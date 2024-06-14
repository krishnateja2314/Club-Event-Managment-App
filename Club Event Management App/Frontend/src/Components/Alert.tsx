import { ReactNode } from "react";

interface props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: props) => {
  return (
    <div
      style={{ margin: 0 }}
      className="alert alert-info alert-warning alert-dismissible fade show"
    >
      {children}
      <button
        onClick={onClose}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
