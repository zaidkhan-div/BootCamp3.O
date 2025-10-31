import { API_PATHS } from './apiPaths.js';
import axiosInstance from './axiosInstance.js';

const uploadImage = async (imageFile) => {
  // Optional: Add validation
  if (!imageFile) {
    throw new Error('No image file provided');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    // Return a descriptive error if available
    throw error.response?.data || error;
  }
};

export default uploadImage;
