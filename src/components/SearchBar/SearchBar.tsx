import React, { useRef } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { FaExclamationCircle } from 'react-icons/fa';

interface SearchFormProps {
  onSearch: (searchingText: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!inputRef.current) return;
  
    const searchingText = inputRef.current.value.toLowerCase();
    if (!searchingText.trim()) { 
      toast('Oh, no! You didn\'t type any letter!', {
        icon: <FaExclamationCircle size="24" />,
      });
      return;
    }
    onSearch(searchingText);
    evt.currentTarget.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          aria-label="Search input"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchForm;
