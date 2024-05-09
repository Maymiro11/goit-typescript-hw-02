import React from "react";
import css from "./ImageCard.module.css";

interface ImageData {
  url: string;
  alt: string;
  location: string;
  portfolio: string;
  name: string;
}

interface Image {
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

interface ImageCardProps {
  image: Image;
  onView: (imageData: ImageData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onView }) => {
  function handleClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const imageTargeted = e.target as HTMLImageElement;
    const imageData = imageTargeted.dataset;
    const modalImage: ImageData = {
      url: imageData.url || "",
      alt: imageTargeted.getAttribute("alt") || "",
      name: imageData.author || "",
      location: imageData.location || "",
      portfolio: imageData.portfolio || "",
    };
    onView(modalImage);
  }

  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
        data-url={image.urls.regular}
        data-likes={image.likes.toString()}
        data-author={image.user.name}
        data-location={image.user.location}
        data-portfolio={image.user.links.html}
        width={300}
        height={200}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;
