import React from 'react';
import { ImgModal, Overlay } from './Modal.styled';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.handleModalClose();
    }
  };
  handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      this.props.handleModalClose();
    }
  };
  render() {
    const { largeImage } = this.props;
    return (
      <Overlay
        className="overlay"
        id="overlay"
        onClick={this.handleBackdropClose}
      >
        <ImgModal className="modal">
          <img src={largeImage} alt="name" />
        </ImgModal>
      </Overlay>
    );
  }
}
// this.props.handleModalClose
export default Modal;
