import axios from 'axios';
import PropTypes from 'prop-types';

export const getImages = async ({ query, page }) => {
  const response = await axios({
    method: 'GET',
    url: 'https://pixabay.com/api/',
    params: {
      key: '39495735-1e28386ea245dafd6542f3284',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: `${page}`,
    },
  });
  return response.data;
};

getImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
