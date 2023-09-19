import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import "../styles/ImageGallery.css";
import Loader from "./Loader";
import { v4 as uuidv4 } from "uuid";

const apiKey = "39541743-4842b36dfb16e3acc7079f258";
const breakpointColumnsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1,
};

const SearchGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedImage, setDraggedImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const [toggleRender, setToggleRender] = useState(false);
  const { searchTerm } = useParams();

  const dropContainerRef = useRef(null);

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

  //   const reorderImages = (draggedImage, targetImage) => {
  //     const updatedImages = [...images];
  //     const draggedIndex = updatedImages.findIndex(image => image.id === draggedImage.id);
  //     const targetIndex = updatedImages.findIndex(image => image.id === targetImage.id);

  //     [updatedImages[draggedIndex], updatedImages[targetIndex]] = [targetImage, draggedImage];

  //     return updatedImages;
  //   };

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

  const handleLocalImageDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleLocalImageFiles(files);
  };

  const handleLocalImageFiles = (files) => {
    const uploadedImages = Array.from(files).map((file) => ({
      id: uuidv4(),
      webformatURL: URL.createObjectURL(file),
      tags: "Uploaded Image",
    }));

    setImages([...images, ...uploadedImages]);
  };

  return (
    <div
      className="py-5"
      ref={dropContainerRef}
      onDragOver={(e) => e.preventDefault()}
      //   onDrop={handleLocalImageDrop}
    >
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light">
          <h1 className="text-center mb-4">Search Results For: {searchTerm}</h1>
          {loading ? (
            <Loader />
          ) : (
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
          )}
          <div className="d-flex sign-in-out-btn">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>

            <LinkContainer to="/register">
              <Button variant="secondary">Sign Up</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default SearchGallery;
