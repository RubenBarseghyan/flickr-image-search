import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import ImageCard from './ImageCard';
import { Photo } from '../api/flickr';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Photo[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleFavorite = (photo: Photo) => {
    const updatedFavorites = favorites.filter(f => f.id !== photo.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {favorites.map(photo => (
          <ImageCard
            key={photo.id}
            photo={photo}
            onFavorite={handleFavorite}
            isFavorite={true}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default Favorites;
