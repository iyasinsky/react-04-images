import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    photos: [],
    page: 1,
    loader: false,
    total: 0,
    selectedImg: null,
  };

  async componentDidUpdate() {
    try {
      if (this.state.loader) {
        const { hits, totalHits } = await getImages(this.state);

        if (hits.length) {
          this.setState(({ photos }) => ({
            photos: [...photos, ...hits],
            loader: false,
            total: totalHits,
          }));
          return;
        }

        this.setState({ loader: false });
        notify(`No images found for ${this.state.query}`);
      }
    } catch (error) {
      this.setState({ loader: false });
      notify(`${error.message}`);
    }
  }

  onFormSubmit = ({ query }) => {
    this.setState({
      query,
      page: 1,
      photos: [],
      loader: true,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      loader: true,
    }));
  };

  setSelectedImg = selectedImg => {
    this.setState({ selectedImg });
  };

  closeModal = () => {
    this.setState({ selectedImg: null });
  };

  render() {
    const { photos, loader, total, selectedImg } = this.state;
    const isShown = photos.length > 0 && photos.length < total && !loader;

    return (
      <Wrapper>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        <ImageGallery photos={photos} onClick={this.setSelectedImg} />
        {loader && <Loader />}
        {isShown && <Button onClick={this.loadMore} />}
        <ImageModal
          isOpen={selectedImg !== null}
          onClose={this.closeModal}
          selectedImg={selectedImg}
        />
        <ToastContainer />
        <GlobalStyle />
      </Wrapper>
    );
  }
}
