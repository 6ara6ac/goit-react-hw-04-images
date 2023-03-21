import {useEffect} from "react";
import { createPortal } from "react-dom"; 
import PropTypes from 'prop-types';



const modalRoot = document.querySelector('#modal-root')

export const Modal = ( {largeImageURL, tags, onClose} ) => {
    

    useEffect(() =>  {window.addEventListener('keydown', handleClose)
    return ()=> window.removeEventListener('keydown', handleClose)})



   const handleClose = e => {
        if(e.code === 'Escape'){
            onClose();
            return
        }
        if (e.target === e.currentTarget){
            onClose();
            return
        }
        return
    }

        
        return createPortal(
        <div className="Overlay" onClick={handleClose}>
        <div className="Modal">
        <img src={largeImageURL} alt={tags}/>
        </div>
        </div>, modalRoot
        )
        
}

Modal.propTypes = {
    tags: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}





