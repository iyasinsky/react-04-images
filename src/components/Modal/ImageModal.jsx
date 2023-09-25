import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#modal-root');

export const ImageModal = ({ isOpen, selectedImg, onClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className={'modal'}
    overlayClassName={'overlay'}
    contentLabel="Image modal"
  >
    <img src={selectedImg} alt="img" />
  </Modal>
);

ImageModal.propTypes = {
  isOpen: PropTypes.bool,
  selectedImg: PropTypes.string,
  onClose: PropTypes.func,
};
