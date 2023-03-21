import {useState} from "react";
import { Modal } from "../Modal/Modal";
import PropTypes from 'prop-types';


export const ItemGallery = ( {largeImageURL, webformatURL, tags} )=>  {
     
    const[showModal, setShowModal] = useState(false)
    const [currentImg, setCurrentImg] = useState('')


   const toggleModal = () => {
        setShowModal (prevState => (!prevState))
    }

    const handleClick = () => {
        setCurrentImg(largeImageURL) 
        toggleModal();
        return;
    }

        return <>
        <img className="ImageGalleryItem-image" alt={tags} src={webformatURL} onClick={handleClick}/>
        {showModal && <Modal largeImageURL={currentImg} tags={tags} onClose={toggleModal}/>}
        </>
    
}

ItemGallery.propTypes= {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string
}