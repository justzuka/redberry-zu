import React, { useEffect, useState } from "react";
import "./ImageUploader.css";

import { ReactComponent as FOLDER_ADD } from "../../Image_SVG_Resources/folder-add.svg";

import { ReactComponent as GALLERY } from "../../Image_SVG_Resources/gallery.svg";
import CloseButton from "../CloseButton/CloseButton";

const ImageUploader = ({ setValueParent }) => {
  const [image, setImage] = useState(null);

  const store = () => {
    if (image === null) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      localStorage.setItem("image", JSON.stringify(base64String));
    };
    reader.readAsDataURL(image);

    localStorage.setItem("image_title", JSON.stringify(image.name));
    localStorage.setItem("image_type", JSON.stringify(image.type));
  };

  const readAndSet = () => {
    const image = JSON.parse(localStorage.getItem("image"));
    if (image !== null) {
      const byteString = atob(image.split(",")[1]);
      const byteNumbers = new Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const imageType = JSON.parse(
        localStorage.getItem("image_type") ?? "image/jpeg"
      );
      const blob = new Blob([byteArray], { type: imageType });
      const imageName = JSON.parse(
        localStorage.getItem("image_title") ?? "image.jpeg"
      );

      const file = new File([blob], imageName, { type: imageType });
      setImage(file);
      console.log(file, imageType);
    }
  };

  useEffect(() => {
    if (setValueParent !== undefined) {
      setValueParent(image);
    }
    store()
  }, [image]);

  useEffect(() => {
    readAndSet()
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const selectedImage = droppedFiles[0];
      setImage(selectedImage);
    }
  };

  const handleFileInput = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleFileInputChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <>
      <label className="upload-label">ატვირთეთ ფოტო</label>
      {image ? (
        <div className="image-details">
          <GALLERY className="gallery-icon" />
          <div className="image-name">{image.name}</div>
          <CloseButton onClick={handleRemoveImage} />
        </div>
      ) : (
        <div className={`image-uploader-container ${image ? "shrink" : ""}`}>
          <div
            className="drag-drop-container"
            onClick={handleFileInput}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleFileInputChange}
            />
            <div className={`drag-drop-box ${image ? "shrink" : ""}`}>
              <div className="box-content">
                <FOLDER_ADD className="folder-add" />
                <div className="drag-drop-text">
                  ჩააგდეთ ფაილი აქ ან{" "}
                  <div className="drag-drop-text-dark">აირჩიეთ ფაილი</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
