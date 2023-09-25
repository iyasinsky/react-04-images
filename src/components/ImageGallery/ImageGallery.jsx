import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ photos, onClick }) => (
  <List>
    {photos.map(({ id, ...rest }) => (
      <li key={id}>
        <ImageGalleryItem onClick={onClick} {...rest} />
      </li>
    ))}
  </List>
);

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
