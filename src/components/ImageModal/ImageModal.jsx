import Modal from "react-modal";
import css from "./ImageModal.module.css";

function ImageModal({
  chosenImage: { url, alt, name, location, portfolio }, 
  onBackDrop,
  isOpen,
}) {
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={false}
      onRequestClose={() => onBackDrop(null)}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999999",
          backgroundColor: "rgba(45, 45, 45, 0.3)",
          backdropFilter: "blur(5px)",
        },
        content: {
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0",
          padding: 0,
          width: "800px",
          height: "fit-content",
          opacity: 1,
          backgroundColor: "black",
          color: "white",
          inset: 0,
        },
      }}
      contentElement={
        (props, children) => <div {...props}>{children}</div>
      }
    >

      <div className={css.container}>
        <img src={url} alt={alt} />
        <p className={css.text}>
          {name}
          {location ? ` from ${location}` : ` from lovely Earth planet`} --&gt;
          More photos
          <a
            className={css.link}
            href={portfolio}
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;here
          </a>
        </p>
        

      </div>
    </Modal>
  );
}

export default ImageModal;