import React, { useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    await imageRef.put(image);
    const imageUrl = await imageRef.getDownloadURL();

    try {
      const response = await axios.post('/api/classify-image', { imageUrl });
      setLabels(response.data);
    } catch (error) {
      console.error('Error classifying image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleImageChange} />
        <Button type="submit" variant="contained" color="primary">
          {loading ? <CircularProgress size={24} /> : 'Upload and Classify'}
        </Button>
      </form>
      {labels.length > 0 && (
        <div>
          <Typography variant="h6">Classified Labels:</Typography>
          <ul>
            {labels.map((label, index) => (
              <li key={index}>{label.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
