import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import fetchImages from './Api';
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchingText, setSearchingText] = useState("");
  const [isScroll, setIsScroll] = useState(false);

  window.onscroll = function scrollSetting() {
    if (window.scrollY > 20) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    async function galleryBuilding(searchingText, page) {
      try {
        if (searchingText.length === 0) return;
        setError(null);
        setIsLoading(true);
        const resp = await fetchImages(searchingText, page);
        if (resp.results.length === 0) {
          throw new Error("Nothing found!");
        }
        if (page > 1) {
          setGallery((prevGallery) => [...prevGallery, ...resp.results]);
        } else {
          setGallery(resp.results);
        }
        if (resp.total / 9 > page) {
          setIsLoadMore(true);
        } else {
          setIsLoadMore(false);
        }
      } catch (error) {
        setError(error);
        setIsLoadMore(false);
        console.log(error);
        toast.error(`Oooops! ${error.message}!`);
      } finally {
        setIsLoading(false);
      }
    }
    galleryBuilding(searchingText, page);
  }, [searchingText, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function backDropSetting(modalImageObj) {
    setModalImage(modalImageObj);
  }

  function handleSearch(searchingText) {
    setGallery([]);
    setIsLoadMore(false);
    setSearchingText(searchingText);
    setPage(1);
  }

  function handleLoad() {
    setPage(page + 1);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid cadetblue",
            padding: "16px",
            color: "#8bb9ba",
            backgroundColor: "#454545",
          },
        }}
      />
      {error ? (
        <ErrorMessage errorObj={error} />
      ) : (
        <ImageGallery
          galleryArray={gallery}
          isScroll={isScroll}
          onView={backDropSetting}
        />
      )}
      {modalImage && (
        <ImageModal
          chosenImage={modalImage}
          isOpen={modalImage && true}
          onBackDrop={backDropSetting}
        />
      )}
      {isLoading && <Loader />}
      {isLoadMore && !isLoading && <LoadMoreBtn onLoad={handleLoad} />}
    </>
  );
}

export default App;
