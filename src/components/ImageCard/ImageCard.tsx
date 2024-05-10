import React from "react";
import css from "./ImageCard.module.css";

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
}

interface ImageCardProps {
  openModal: (imageUrl: string) => void;
  photo: Photo;
}

const ImageCard: React.FC<ImageCardProps> = ({ openModal, photo }) => {

  return (
    <div className={css.card}>
      <img
        onClick={() => openModal(photo.urls.regular)}
        className={css.cardImg}
        src={photo.urls.small}
        alt=""
      />
    </div>
  );
};

export default ImageCard;
