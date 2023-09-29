import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from 'helpers/GlobalStyle';
import { Wrapper } from './App.styled';
import { notify } from '../../helpers/Notify';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { getImages } from '../services/PixabayApi';
import { Loader } from '../Loader/Loader';
import { ImageModal } from '../Modal/ImageModal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (!loader) return;

    (async () => {
      try {
        const { hits, totalHits } = await getImages(query, page);

        !hits.length && notify(`No images found for ${query}`);

        setPhotos(prev => [...prev, ...hits]);
        setTotal(totalHits);
      } catch (error) {
        notify(`${error.message}`);
      } finally {
        setLoader(false);
      }
    })();
  }, [loader, page, query]);

  const onFormSubmit = ({ query }) => {
    setLoader(true);
    setQuery(query);
    setPage(1);
    setPhotos([]);
  };

  const loadMore = () => {
    setLoader(true);
    setPage(prev => prev + 1);
  };

  const isShown = photos.length > 0 && photos.length < total && !loader;

  return (
    <Wrapper>
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery photos={photos} onClick={setSelectedImg} />
      {loader && <Loader />}
      {isShown && <Button onClick={loadMore} />}
      <ImageModal
        isOpen={selectedImg !== null}
        onClose={() => setSelectedImg(null)}
        selectedImg={selectedImg}
      />
      <ToastContainer />
      <GlobalStyle />
    </Wrapper>
  );
};
