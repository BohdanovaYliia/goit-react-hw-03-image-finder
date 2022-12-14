import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Overlay, ModalWindow } from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    static propTypes = {
        closeModal: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.closeModal(e);
        }
    }

    handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            this.props.closeModal(e);
        }
    }

    componentDidMount () {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    render () {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalWindow>
                    <img src={this.props.url} alt=""/>
                </ModalWindow>
            </Overlay>,
            modalRoot
        )
    };
}