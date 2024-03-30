import css from "./ImageCard.module.css";

function ImageCard({
  image: {
    alt_description,
    likes,
    user,
    urls: { small, regular },
  },
  onView,
}) {
  function handleClick(e) {
    const imageTargeted = e.target;
    const imageData = imageTargeted.dataset;
    const modalImage = {
      url: imageData.url,
      alt: imageTargeted.getAttribute("alt"),
      name: imageData.author,
      location: imageData.location,
      portfolio: imageData.portfolio,
    };
    onView(modalImage);
  }

  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={small}
        alt={alt_description}
        data-url={regular}
        data-likes={likes}
        data-author={user.name}
        data-location={user.location}
        data-portfolio={user.links.html}
        width={300}
        height={200}
        onClick={handleClick}
      />
    </div>
  );
}

export default ImageCard;