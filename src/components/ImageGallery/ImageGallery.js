import { ItemGallery } from "../ItemGallery/ItemGallery"
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {

    return <>
        <ul className="ImageGallery">
        {images.map(( {id, webformatURL, largeImageURL, tags }) =>{
            return <ItemGallery className='ImageGalleryItem' 
            key ={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}>
            </ItemGallery>} )}
  </ul>
  </>
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string
        })
    )
}
