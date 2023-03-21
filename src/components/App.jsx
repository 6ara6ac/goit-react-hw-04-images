import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchImages } from "../service/API";
import { Spinner } from "./Other/spinner";
import { Container } from "./Other/Container.styled";






export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)
  const [error, setError] = useState (null)
  const [isFirstload, setIsFirstLoad] = useState(true)


  // state = {
  //   images: [],
  //   page: 1,
  //   status: 'idle',
  //   error: null,
  // }


   useEffect(()=>{
        if(isFirstload){
          return;
        }
        setStatus('pending')
        
        const getImg = async () => { 
        await fetchImages(query, page)
        .then(({totalHits, hits}) => {
          console.log(page)
          if(!totalHits) {
            throw new Error('We have nothing for this query');
          }

          
          if (page > 1) {
            const totalPages = Math.ceil(totalHits/12)
            setImages(prevState =>{ 
              return [
                ...prevState,
                ...hits.map(({ id, webformatURL, largeImageURL, tags }) => {
                return { id, webformatURL, largeImageURL, tags };
              }),
            ]
            })
            setStatus('resolved')
  
            if (page === totalPages) {
              setStatus('rejected')
              throw new Error('You loaded all images');
            }
            return;
            }
            setImages(
              hits.map(({ id, webformatURL, largeImageURL, tags }) => {
                return { id, webformatURL, largeImageURL, tags };
              })
            );
          setStatus('resolved')
          return;
      })
      .catch (error => {
        console.log(error)
        setStatus('rejected') 
        setError(error.message)
      })} 
      getImg();
  },[isFirstload, page, query]) 
  

  const onLoadMore = () => {
    setPage (page+1)
    setStatus('pending')
  }


  const onHandleSubmit = async searchQuery => {
    if(searchQuery === query){
      return;
    }


    setIsFirstLoad(false)
    setQuery(searchQuery)
    setPage(1);
    setImages([])
    setStatus('pending')
  }



    // const {images, status, error} = this.state

    return <div>
    <Searchbar fetch={onHandleSubmit}/>
    <ImageGallery images={images}/>
    <Container>
    {status === 'pending' && <Spinner/>}
    {status === 'rejected' && <p>{error}</p>}
    {status === 'resolved' && <button className="Button" onClick={onLoadMore} type="button">Load more</button>}
    </Container>
    </div>
};

