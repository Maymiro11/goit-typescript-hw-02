import React from "react";
import { BiSolidChevronsUp } from "react-icons/bi";
import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

interface ImageData {
  id: string;
  alt_description: string;
  likes: number;
  user: {
    name: string;
    location: string;
    links: {
      html: string;
    };
  };
  urls: {
    small: string;
    regular: string;
  };
}

interface ImageGalleryProps {
  galleryArray: ImageData[];
  isScroll: boolean;
  onView: (imageData: ImageData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  galleryArray,
  isScroll,
  onView,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <ul className={css.list}>
        {galleryArray.map((image) => (
          <li className={css.item} key={image.id} tabIndex={0}>
            <ImageCard image={image} onView={onView} />
          </li>
        ))}
      </ul>
      {isScroll && (
        <div className={css.top}>
          <button className={css.arrow} onClick={scrollToTop}>
            <BiSolidChevronsUp className={css.icon} size="32" />
          </button>
        </div>
      )}
    </main>
  );
};

export default ImageGallery; 