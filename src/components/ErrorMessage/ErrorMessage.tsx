import css from "./ErrorMessage.module.css";
import React from "react";

interface ErrorProps {
  errorObj: {
    message: string;
  };
}

const ErrorMessage: React.FC<ErrorProps> = ({ errorObj }) => {
  return (
    <main>
      <p className={css.text}>Ooops! {errorObj.message}!</p>;
    </main>
  );
}

export default ErrorMessage;