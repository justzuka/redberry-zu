import React, { useState } from "react";
import "./ImageUploader.css";

import { ReactComponent as FOLDER_ADD } from "../../Image_SVG_Resources/folder-add.svg";

import { ReactComponent as GALLERY } from "../../Image_SVG_Resources/gallery.svg";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

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
          <div className="remove-image" onClick={handleRemoveImage}>
            &#x2716;
          </div>
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
