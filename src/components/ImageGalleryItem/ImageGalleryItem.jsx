import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  onClick,
}) => (
  <img src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL)} />
);

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
