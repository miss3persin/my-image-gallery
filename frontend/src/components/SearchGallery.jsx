import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import "../styles/ImageGallery.css";
import Loader from "./Loader";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';

const apiKey = "39541743-4842b36dfb16e3acc7079f258";
const breakpointColumnsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1,
};

const SearchGallery = () => {
  const [user] = useAuthState(auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedImage, setDraggedImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const [toggleRender, setToggleRender] = useState(false);
  const { searchTerm } = useParams();


  useEffect(() => {
    console.log(searchTerm);
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
          searchTerm
        )}`
      );
      setImages(response.data.hits);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e, image) => {
    e.preventDefault();
    setTargetImage(image);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const updatedImages = [...images];
    const draggedIndex = updatedImages.findIndex(
      (image) => image.id === draggedImage.id
    );
    const targetIndex = updatedImages.findIndex(
      (image) => image.id === targetImage.id
    );

    updatedImages.splice(
      targetIndex,
      0,
      updatedImages.splice(draggedIndex, 1)[0]
    );

    setToggleRender((prevState) => !prevState);
    setImages(updatedImages);

    setDraggedImage(null);
    setTargetImage(null);
  };

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light">
          <h1 className="text-center mb-4">Search Results For: {searchTerm}</h1>
          <p className="text-center mb-4">Drag and Drop features only available for Signed In users.</p>
          {loading ? (
            <Loader />
          ) : (
            <>
              {user ? (
                <>
                <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
                {images
                  .slice()
                  .reverse()
                  .map((image) => (
                    <div
                      key={image.id}
                      className={`masonry-item ${
                        toggleRender && "trigger-transition"
                      } ${
                        draggedImage && draggedImage.id === image.id
                          ? "dragging"
                          : ""
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, image)}
                      onDragOver={(e) => handleDragOver(e, image)}
                      onDrop={handleDrop}
                    >
                      <img
                        src={image.webformatURL}
                        alt={image.tags}
                        className="image-item"
                      />
                      <p className="image-tag">
                        {image.tags.split(",").map((tag) => (
                          <span key={tag}>#{tag.trim()} </span>
                        ))}
                      </p>
                    </div>
                  ))}
                  </Masonry>
                  </>
              ) : (
                <>
                <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
                {images.slice().reverse().map((image) => (
                    <div
                      key={image.id}
                      className= "masonry-item"
                    >
                      <img
                        src={image.webformatURL}
                        alt={image.tags}
                        className="image-item"
                      />
                      <p className="image-tag">
                        {image.tags.split(",").map((tag) => (
                          <span key={tag}>#{tag.trim()} </span>
                        ))}
                      </p>
                    </div>
                  ))}
                  </Masonry>
                  </>
              )}
            </>
          )}
            {user ? (
              <div className="d-flex sign-in-out-btn">
              <LinkContainer to="/user">
                <Button variant="secondary">Back</Button>
              </LinkContainer>
            </div>
            ) : (
              <div className="d-flex sign-in-out-btn">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>

            <LinkContainer to="/user">
              <Button variant="secondary">Back</Button>
            </LinkContainer>
          </div>
            )}
        </Card>
      </Container>
    </div>
  );
};

export default SearchGallery;
