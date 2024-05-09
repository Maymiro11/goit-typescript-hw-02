import React from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoad: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoad }) => {
  const handleClick = () => {
    onLoad();
  };

  return (
    <button className={css.btn} type="button" onClick={handleClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
