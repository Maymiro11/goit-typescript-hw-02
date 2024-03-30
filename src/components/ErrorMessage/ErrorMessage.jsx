import css from "./ErrorMessage.module.css";

function ErrorMessage({ errorObj }) {
  return (
    <main>
      <p className={css.text}>Ooops! {errorObj.message}!</p>;
    </main>
  );
}

export default ErrorMessage;