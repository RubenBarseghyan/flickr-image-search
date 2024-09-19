import React, { useState, useEffect } from 'react';
import { Input, notification, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getRecentImages, searchImages, Photo } from '../api/flickr';
import Masonry from 'react-masonry-css';
import { Suspense } from 'react';
const ImageCard = React.lazy(() => import('./ImageCard'));



interface ImageGalleryProps {
  onCompare?: (image1: Photo, image2: Photo) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ onCompare }) => {
  const [images, setImages] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Photo[]>([]);
  const [selectedImages, setSelectedImages] = useState<Photo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = searchQuery
          ? await searchImages(page, searchQuery)
          : await getRecentImages(page);

        setImages(prev => [...prev, ...data.photos.photo]);
        setHasMore(data.photos.page < data.photos.pages);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch images. Please try again later.',
        });
      }
    };

    fetchImages();
  }, [page, searchQuery]);

  const handleFavorite = (photo: Photo) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex(f => f.id === photo.id);
    if (index > -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(photo);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleCompare = (photo: Photo) => {
    if (selectedImages.length < 2) {
      setSelectedImages(prev => [...prev, photo]);
    }
    if (selectedImages.length === 1) {
      onCompare?.(selectedImages[0], photo);
      setSelectedImages([]);
    }
  };

  const isImageSelected = (photo: Photo) => selectedImages.some(img => img.id === photo.id);

  const onSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page
    setImages([]); // Clear current images
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <Input
          placeholder="Search for images"
          value={inputValue}
          onChange={handleInputChange}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          type="primary"
          onClick={handleSearchClick}
          disabled={!inputValue.trim()}
        >
          Search
        </Button>
      </div>
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage(prev => prev + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((photo) => (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageCard
              photo={photo}
              onFavorite={handleFavorite}
              isFavorite={favorites.some(f => f.id === photo.id)}
              onCompare={handleCompare}
              isSelected={isImageSelected(photo)}
            />
        </Suspense>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default ImageGallery;
