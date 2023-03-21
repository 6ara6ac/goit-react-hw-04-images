import axios from "axios";


export const fetchImages = async (searchQuery, page) => {
    const images = await axios.get (`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=32951992-3201e8549a7160da4f5158a88&image_type=photo&orientation=horizontal&per_page=12`)
    console.log(images.data)
    return images.data;
}