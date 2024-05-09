import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import fetchImages from '../Api';
import { Toaster } from "react-hot-toast";
import { Image, ModalImage, ResponseData } from './App.types';

const App: React.FC = () => {
  const [gallery, setGallery] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchingText, setSearchingText] = useState<string>("");
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    async function galleryBuilding(searchingText: string, page: number) {
      try {
        if (searchingText.length === 0) return;
        setError(null);
        setIsLoading(true);
        const resp: ResponseData = await fetchImages(searchingText, page);
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

  function backDropSetting(modalImageObj: ModalImage | null) {
    setModalImage(modalImageObj);
  }

  function handleSearch(searchingText: string) {
    setGallery([]);
    setIsLoadMore(false);
    setSearchingText(searchingText);
    setPage(1);
  }

  function handleLoad() {
    setPage(page + 1);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
};

export default App;
