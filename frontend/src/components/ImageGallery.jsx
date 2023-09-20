import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect} from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "../styles/ImageGallery.css";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import plus from "../assets/icons8-plus.svg"

const apiKey = "39541743-4842b36dfb16e3acc7079f258";
const breakpointColumnsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 2,
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedImage, setDraggedImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const [toggleRender, setToggleRender] = useState(false);


  useEffect(() => {
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&per_page=20&order=latest`;

    axios
      .get(apiUrl)
      .then((response) => {
        setImages(response.data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error(error?.data?.message || error.error);
        setLoading(false);
      });
  }, []);

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
      id: Date.now(),
      webformatURL: URL.createObjectURL(file),
      tags: "Uploaded Image",
    }));

    setImages([...images, ...uploadedImages]);
  };

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light">
          <h1 className="text-center mb-4">Image Gallery</h1>
          <div className="drop-area-container">
          <div
            className="drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleLocalImageDrop}
          >
            <img src={plus} alt="" />
          </div>
            <p>Drag and Drop Your Images Here</p>
          </div>
          <div className="drop-area-container-2">
          <div
            className="drop-area-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleLocalImageDrop}
          >
            <img src={plus} alt="" />
          </div>
            <p>Or here </p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {images.slice().reverse().map((image) => (
                <div
                  key={image.id}
                  className={`masonry-item ${
                    toggleRender ? "trigger-transition" : ""
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

export default ImageGallery;
