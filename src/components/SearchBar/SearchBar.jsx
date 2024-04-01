import css from './SearchBar.module.css';
import { useId } from "react";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";

const SearchForm = ({ onSearch }) => {
    const inputId = useId();
  
	const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
	const searchingText = form.elements.search.value.toLowerCase();
    if (searchingText.trim().length === 0) {
      toast("Oh, no! You didn't type any letter!", {
        icon: <FaExclamationCircle size="24" />,
      });
      return;
    }
    onSearch(searchingText);
    form.reset();
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="search"
          id={inputId}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          aria-label="Searhing imput"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchForm;