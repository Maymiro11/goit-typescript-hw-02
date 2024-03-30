import ImageCard from "../ImageCard/ImageCard";
import { forwardRef } from "react";
import { BiSolidChevronsUp } from "react-icons/bi";
import css from "./ImageGallery.module.css";

const ImageGallery = forwardRef(function ImageGallery(
  { galleryArray, isScroll, onView },
  galleryRef
) {
  return (
    <main>
      <ul className={css.list} ref={galleryRef}>
        {galleryArray.map((image) => (
          <li className={css.item} key={image.id} tabIndex={0}>
            <ImageCard image={image} onView={onView} />
          </li>
        ))}
      </ul>
      {isScroll && (
        <div className={css.top}>
          <a className={css.arrow} href="#top">
            <BiSolidChevronsUp className={css.icon} size="32" />
          </a>
        </div>
      )}
    </main>
  );
});

export default ImageGallery;