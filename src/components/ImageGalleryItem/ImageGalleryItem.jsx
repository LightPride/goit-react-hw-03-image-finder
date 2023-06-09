import React from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webImage }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webImage} alt={webImage} />
    </GalleryItem>
  );
};
